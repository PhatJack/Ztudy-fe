import { apiClient } from "@/lib/client";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const createRoomBodySchema = roomSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  is_active: true,
  code_invite: true,
  thumbnail: true,
});

export type CreateRoomBodySchema = z.infer<typeof createRoomBodySchema>;

export type CreateRoomResponseSchema = z.infer<typeof roomSchema>;

export async function createRoomApi(
  body: CreateRoomBodySchema
): Promise<CreateRoomResponseSchema> {
  const res = await apiClient.post<CreateRoomResponseSchema>("/rooms/", body);
  return res.data;
}

export function useCreateRoomMutation() {
  const mutationKey = ["create-study-group"];
  return useMutation<CreateRoomResponseSchema, unknown, CreateRoomBodySchema>({
    mutationKey,
    mutationFn: (body: CreateRoomBodySchema) =>
      createRoomApi(createRoomBodySchema.parse(body)),
    throwOnError: isAxiosError,
  });
}
