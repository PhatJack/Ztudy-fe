import { apiClient } from "@/lib/client";
import { goalSchema } from "@/lib/schemas/goal/goal.schema";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const goalQuerySchema = paginationRequestSchema.extend({
  expand: z.string().optional(),
  user: z.number().optional(),
  status: z.enum(["OPEN", "COMPLETED"]).optional(),
});

export type GoalQuerySchema = z.infer<typeof goalQuerySchema>;

export const goalResponseBodySchema = createListResponseSchema(goalSchema);

export type GoalResponseBodySchema = z.infer<typeof goalResponseBodySchema>;

export async function listGoalsApi(
  query: GoalQuerySchema = {}
): Promise<GoalResponseBodySchema> {
  const response = await apiClient.get<GoalResponseBodySchema>(
    "/session-goals/",
    query
  );
  return goalResponseBodySchema.parse(response.data);
}

export const useListGoals = (query: GoalQuerySchema = {}) => {
  const queryKey = ["goals", query];
  return queryOptions<GoalResponseBodySchema>({
    queryKey,
    queryFn: async () => await listGoalsApi(goalQuerySchema.parse(query)),
    throwOnError: isAxiosError,
  });
};

export const useInfiniteListGoals = (query: GoalQuerySchema = {}) => {
  const queryKey = ["goals", query];

  return infiniteQueryOptions<
    GoalResponseBodySchema, // TQueryFnData: Raw data from the query
    unknown, // TError: Error type
    GoalResponseBodySchema, // TData: Transformed/selected data
    Array<string | GoalQuerySchema>, // TQueryKey: Query key type
    number // TPageParam: Page parameter type
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) => listGoalsApi({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
    getPreviousPageParam: (firstPage) => {
      const previousPage = firstPage.page - 1;
      return previousPage < 1 ? undefined : previousPage;
    },
    select: (data) => ({
      totalItems: data.pages[0]?.totalItems || 0,
      totalPages: data.pages[0]?.totalPages || 0,
      page: data.pages[0]?.page || 1,
      results: data.pages.flatMap((page) => page.results),
    }),
    throwOnError: isAxiosError,
  });
};
