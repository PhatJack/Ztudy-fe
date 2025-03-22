import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomsResponseSchema = createListResponseSchema(roomSchema);

export type ListRoomsResponseSchema = z.infer<typeof listRoomsResponseSchema>;

export async function listRoomssApi(): Promise<ListRoomsResponseSchema> {
  const res = await apiClient.get<ListRoomsResponseSchema>("/rooms/");
  return res.data;
}

export function useListRooms() {
  const queryKey = ["rooms"] as const;

  return queryOptions<ListRoomsResponseSchema>({
    queryKey,
    queryFn: listRoomssApi,
    throwOnError: isAxiosError,
  });
}
