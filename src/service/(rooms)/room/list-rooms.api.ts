import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomsResponseSchema = createListResponseSchema(roomSchema);

export type ListRoomsResponse = z.infer<typeof listRoomsResponseSchema>;

export async function listRoomssApi(): Promise<ListRoomsResponse> {
  const res = await apiClient.get<ListRoomsResponse>("/rooms/");
  return res.data;
}

export function useListRooms() {
  const queryKey = ["rooms"] as const;

  return queryOptions<ListRoomsResponse>({
    queryKey,
    queryFn: listRoomssApi,
    throwOnError: isAxiosError,
  });
}
