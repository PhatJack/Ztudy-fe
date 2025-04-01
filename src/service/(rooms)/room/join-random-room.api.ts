import { apiClient } from "@/lib/client";
import { roomWithCategorySchema } from "@/lib/schemas/room/room.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const joinRandomRoomResponseSchema = z.object({
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

export type JoinRandomRoomResponseSchema = z.infer<typeof joinRandomRoomResponseSchema>;

export async function joinRandomRoomApi() {
  const res = await apiClient.post<JoinRandomRoomResponseSchema>(
    `/rooms/join-random/`,
    {}
  );

  return res;
}

export const useJoinRandomRoomMutation = () => {
  return useMutation({
    mutationKey: ["join-random-room"],
    mutationFn: () => joinRandomRoomApi(),
  });
};
