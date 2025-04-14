import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { userFavoriteVideoSchema } from "@/lib/schemas/user-favorite-video/user-favorite-video.schema";
import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listUserFavoriteVideosResponseSchema = createListResponseSchema(
  userFavoriteVideoSchema
);

export type ListUserFavoriteVideosResponseSchema = z.infer<
  typeof listUserFavoriteVideosResponseSchema
>;

export const listUserFavoriteVideosQuerySchema = paginationRequestSchema.extend(
  {
    user: z.number().optional(),
  }
);

export type ListUserFavoriteVideoQuerySchema = z.infer<
  typeof listUserFavoriteVideosQuerySchema
>;
export const listUserFavoriteVideoApi = async (
  query: ListUserFavoriteVideoQuerySchema
) => {
  const res = await apiClient.get<ListUserFavoriteVideosResponseSchema>(
    "/user-favorite-videos/",
    query
  );
  return res.data;
};

export const useListUserFavoriteVideoApi = (
  query: ListUserFavoriteVideoQuerySchema = {}
) => {
  const queryKey = ["user-favorite-videos", query] as const;

  return queryOptions({
    queryKey,
    queryFn: () =>
      listUserFavoriteVideoApi(listUserFavoriteVideosQuerySchema.parse(query)),
    throwOnError: isAxiosError,
  });
};

export const useInfiniteListUserFavoriteVideo = (
  query: ListUserFavoriteVideoQuerySchema = {}
) => {
  const queryKey = ["user-favorite-videos", query];

  return infiniteQueryOptions<
    ListUserFavoriteVideosResponseSchema, // TQueryFnData: Raw data from the query
    unknown, // TError: Error type
    ListUserFavoriteVideosResponseSchema, // TData: Transformed/selected data
    Array<string | ListUserFavoriteVideoQuerySchema>, // TQueryKey: Query key type
    number // TPageParam: Page parameter type
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      listUserFavoriteVideoApi({ ...query, page: pageParam }),
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
