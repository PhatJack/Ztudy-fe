import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { userFavoriteVideoSchema } from "@/lib/schemas/user-favorite-video/user-favorite-video.schema";
import { queryOptions } from "@tanstack/react-query";
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
  const res = await apiClient.get("/user-favorite-videos/", query);
  return res;
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
