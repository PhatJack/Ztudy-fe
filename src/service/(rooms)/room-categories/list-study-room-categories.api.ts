import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  KeyParamsSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { roomCategoriesSchema } from "@/lib/schemas/room/room-categories.schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomCategoriesResponseSchema =
  createListResponseSchema(roomCategoriesSchema);

export type ListRoomCategoriesResponseSchema = z.infer<
  typeof listRoomCategoriesResponseSchema
>;

export const listRoomCategoriesQuerySchema = paginationRequestSchema.extend({
  expand: z.string().optional(),
});

export type ListRoomCategoriesQuerySchema = z.infer<
  typeof listRoomCategoriesQuerySchema
>;

export async function listRoomCategoriesApi(
  query: ListRoomCategoriesQuerySchema = {}
): Promise<ListRoomCategoriesResponseSchema> {
  const res = await apiClient.get<ListRoomCategoriesResponseSchema>(
    "/room-categories/",
    query
  );

  return res.data;
}

export const useStudyListRoomCategories = (
  query: ListRoomCategoriesQuerySchema = {}
) => {
  const queryKey = ["room-categories"];

  return queryOptions<ListRoomCategoriesResponseSchema>({
    queryKey,
    queryFn: () => listRoomCategoriesApi(query),
    throwOnError: isAxiosError,
  });
};

export const useListStudyRoomCategoriesInfinite = () => {
  const queryKey = ["room-categories"];

  return infiniteQueryOptions<
    ListRoomCategoriesResponseSchema, // TQueryFnData: Raw data from the query
    unknown, // TError: Error type
    ListRoomCategoriesResponseSchema, // TData: Transformed/selected data
    Array<string | KeyParamsSchema>, // TQueryKey: Query key type
    number // TPageParam: Page parameter type
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) => listRoomCategoriesApi({ page: pageParam }),
    initialPageParam: 1,
    // getNextPageParam
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
			return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
		// getPreviousPageParam
		getPreviousPageParam: (firstPage) => {
			const previousPage = firstPage.page - 1;
			return previousPage < 1 ? undefined : previousPage;
		},
		// select
    select: (data) => ({
      totalItems: data.pages[0]?.totalItems || 0,
      totalPages: data.pages[0]?.totalPages || 0,
      page: data.pages[0]?.page || 1,
      results: data.pages.flatMap((page) => page.results),
    }),
    throwOnError: isAxiosError,
  });
};
