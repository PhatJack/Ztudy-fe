import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  KeyParamsSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import {
  StudyRoomCategoriesSchema,
  studyRoomCategoriesSchema,
} from "@/lib/schemas/study-group/study-room-categories.schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomCategoriesResponseSchema = createListResponseSchema(
  studyRoomCategoriesSchema
);

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
) {
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
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined; // No next page
      const url = new URL(lastPage.next);
      const page = Number(url.searchParams.get("page"));
      return page; // Extract page number from URL
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.previous) return undefined;
      const url = new URL(firstPage.previous);
      const page = Number(url.searchParams.get("page"));
      return page; // Extract page number from URL
    },
    select: (data) => ({
      count: data.pages[0]?.count || 0,
      next: data.pages[data.pages.length - 1]?.next || null,
      previous: data.pages[0]?.previous || null,
      results: data.pages.flatMap((page) => page.results),
    }),
    throwOnError: isAxiosError,
  });
};
