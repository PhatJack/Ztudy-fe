import { apiClient } from "@/lib/client";
import { roomWithCategorySchema } from "@/lib/schemas/room/room.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const leaveRoomResponseSchema = z.object({
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

export type LeaveRoomResponseSchema = z.infer<typeof leaveRoomResponseSchema>;

export async function leaveRoomApi(roomCode: string) {
  const res = await apiClient.post<LeaveRoomResponseSchema>(
    `/rooms/${roomCode}/leave/`,
    {}
  );

  return res;
}

export const useLeaveRoomMutation = () => {
	return useMutation({
		mutationKey: ["leave-room"],
		mutationFn: (roomCode : string) => leaveRoomApi(roomCode),
	});
}