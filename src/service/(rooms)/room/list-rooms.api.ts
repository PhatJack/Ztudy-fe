import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomsResponseSchema = createListResponseSchema(roomSchema);

export type ListRoomsResponseSchema = z.infer<typeof listRoomsResponseSchema>;

export const listRoomsQuerySchema = paginationRequestSchema.extend({
  code_invite: z.string().optional(),
  creator_user: z.coerce.number().optional(),
  type: z.enum(["PUBLIC", "PRIVATE"]).optional(),
});

export type ListRoomsQuerySchema = z.infer<typeof listRoomsQuerySchema>;

export async function listRoomssApi(
  query: ListRoomsQuerySchema
): Promise<ListRoomsResponseSchema> {
  const res = await apiClient.get<ListRoomsResponseSchema>("/rooms/",query);
  return res.data;
}

export function useListRooms(query: ListRoomsQuerySchema = {}) {
  const queryKey = ["rooms"] as const;

  return queryOptions<ListRoomsResponseSchema>({
    queryKey,
    queryFn: () =>  listRoomssApi(query),
    throwOnError: isAxiosError,
  });
}
