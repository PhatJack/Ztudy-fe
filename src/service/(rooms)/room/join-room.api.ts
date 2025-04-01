import { apiClient } from "@/lib/client";
import { roomWithCategorySchema } from "@/lib/schemas/room/room.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const joinRoomResponseSchema = z.object({
  message: z.string(),
  room: roomWithCategorySchema,
  participant: z.object({
    id: z.number(),
    joined_at: z.string().datetime(),
    is_admin: z.boolean(),
    is_out: z.boolean(),
    is_approved: z.boolean(),
    room: z.number(),
    user: z.number(),
  }),
});

export type JoinRoomResponseSchema = z.infer<typeof joinRoomResponseSchema>;

export async function joinRoomApi(roomCode: string) {
  const res = await apiClient.post<JoinRoomResponseSchema>(
    `/rooms/${roomCode}/join/`,
    {}
  );

  return res;
}

export const useJoinRoomMutation = () => {
	return useMutation({
		mutationKey: ["join-room"],
		mutationFn: (roomCode : string) => joinRoomApi(roomCode),
	});
}