import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listTrendingRoomsResponseSchema =
  createListResponseSchema(roomSchema);

export type ListTrendingRoomsResponseSchema = z.infer<
  typeof listTrendingRoomsResponseSchema
>;

export const listTrendingRoomsQuerySchema = paginationRequestSchema.extend({
  expand: z.string().optional(),
});

export type ListTrendingRoomsQuerySchema = z.infer<
  typeof listTrendingRoomsQuerySchema
>;

export async function listTrendingRoomsApi(
  query: ListTrendingRoomsQuerySchema
): Promise<ListTrendingRoomsResponseSchema> {
  const res = await apiClient.get<ListTrendingRoomsResponseSchema>(
    "/rooms/trending/", 
    query
  );
  return res.data;
}

export function useListTrendingRooms(query: ListTrendingRoomsQuerySchema = {}) {
  const queryKey = ["trending-rooms"] as const;

  return queryOptions<ListTrendingRoomsResponseSchema>({
    queryKey,
    queryFn: () => listTrendingRoomsApi(query),
    throwOnError: isAxiosError,
  });
}
