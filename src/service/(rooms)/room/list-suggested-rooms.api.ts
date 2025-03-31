import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listSuggestedRoomsResponseSchema =
  createListResponseSchema(roomSchema);

export type ListSuggestedRoomsResponseSchema = z.infer<
  typeof listSuggestedRoomsResponseSchema
>;

export const listSuggestedRoomsQuerySchema = paginationRequestSchema.extend({
  expand: z.string().optional(),
});

export type ListSuggestedRoomsQuerySchema = z.infer<
  typeof listSuggestedRoomsQuerySchema
>;

export async function listSuggestedRoomsApi(
  query: ListSuggestedRoomsQuerySchema
): Promise<ListSuggestedRoomsResponseSchema> {
  const res = await apiClient.get<ListSuggestedRoomsResponseSchema>(
    "/rooms/suggested/",
    query
  );
  return res.data;
}

export function useListSuggestedRooms(
  query: ListSuggestedRoomsQuerySchema = {}
) {
  const queryKey = ["suggested-rooms"] as const;

  return queryOptions<ListSuggestedRoomsResponseSchema>({
    queryKey,
    queryFn: () => listSuggestedRoomsApi(query),
    throwOnError: isAxiosError,
  });
}
