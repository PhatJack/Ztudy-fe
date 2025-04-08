import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listUsersQuerySchema = paginationRequestSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
});

export type ListUsersQuerySchema = z.infer<typeof listUsersQuerySchema>;

export const listUsersResponseSchema = createListResponseSchema(userSchema);

export type ListUsersResponse = z.infer<typeof listUsersResponseSchema>;

export async function listUsersApi(
  query: ListUsersQuerySchema
): Promise<ListUsersResponse> {
  const res = await apiClient.get<ListUsersResponse>("/users/", query);
  return res.data;
}

export function useListUsers(query: ListUsersQuerySchema = {}) {
  const queryKey = ["users", query] as const;

  return queryOptions<ListUsersResponse>({
    queryKey,
    queryFn: () => listUsersApi(listUsersQuerySchema.parse(query)),
    throwOnError: isAxiosError,
  });
}

export const useListUsersInfinite = () => {
  const queryKey = ["users"];

  return infiniteQueryOptions<
    ListUsersResponse, // TQueryFnData: Raw data from the query
    unknown, // TError: Error type
    ListUsersResponse, // TData: Transformed/selected data
    Array<string | ListUsersQuerySchema>, // TQueryKey: Query key type
    number // TPageParam: Page parameter type
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      listUsersApi({ page: pageParam, page_size: 25 }),
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
