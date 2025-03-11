import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { backgroundVideoSchema } from "@/lib/schemas/solo/background-video.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listBackgroundVideosQuerySchema = paginationRequestSchema.extend({
  type: z.number().optional(),
  expand: z.string().optional(),
});

export type ListBackgroundVideosQuerySchema = z.infer<
  typeof listBackgroundVideosQuerySchema
>;

export const listBackgroundVideosResponseSchema = createListResponseSchema(
  backgroundVideoSchema
);

export type ListBackgroundVideosResponseSchema = z.infer<
  typeof listBackgroundVideosResponseSchema
>;

export async function listBackgroundVideosApi(
  query: ListBackgroundVideosQuerySchema
): Promise<ListBackgroundVideosResponseSchema> {
  const response = await apiClient.get<ListBackgroundVideosResponseSchema>(
    "/background-videos/",
    query
  );
  return response.data;
}

export function useListBackgroundVideos(
  query: ListBackgroundVideosQuerySchema = {}
) {
  const queryKey = ["background-videos", query] as const;

  return queryOptions<ListBackgroundVideosResponseSchema>({
    queryKey,
    queryFn: () => listBackgroundVideosApi(listBackgroundVideosQuerySchema.parse(query)),
    throwOnError: isAxiosError,
  });
}
