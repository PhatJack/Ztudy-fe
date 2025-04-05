import { apiClient } from "@/lib/client";
import { roomSchema } from "@/lib/schemas/room/room.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const createRoomBodySchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s']+$/, "Name can only contain letters, numbers, spaces and apostrophes"),
  category: z.number().nullable(),
  max_participants: z.number()
    .min(2, "Minimum 2 participants required")
    .max(50, "Maximum 50 participants allowed"),
  type: z.enum(["PUBLIC", "PRIVATE"]),
  creator_user: z.number(),
}).refine((data) => {
  if (data.type === "PUBLIC" && (!data.category || data.category === 0)) {
    return false;
  }
  return true;
}, {
  message: "Category is required for public rooms",
  path: ["category"]
});

export type CreateRoomBodySchema = z.infer<typeof createRoomBodySchema>;

export type CreateRoomResponseSchema = z.infer<typeof roomSchema>;

export const createRoomError = {
  INVALID_INPUT: "Invalid input data",
  SERVER_ERROR: "Server error occurred",
  NETWORK_ERROR: "Network error occurred",
} as const;

export async function createRoomApi(
  body: CreateRoomBodySchema
): Promise<CreateRoomResponseSchema> {
  try {
    const res = await apiClient.post<CreateRoomResponseSchema>("/rooms/", body);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(createRoomError.INVALID_INPUT);
      }
      if (!error.response) {
        throw new Error(createRoomError.NETWORK_ERROR);
      }
    }
    throw new Error(createRoomError.SERVER_ERROR);
  }
}

export function useCreateRoomMutation() {
  const mutationKey = ["create-study-group"];
  return useMutation<CreateRoomResponseSchema, Error, CreateRoomBodySchema>({
    mutationKey,
    mutationFn: (body: CreateRoomBodySchema) =>
      createRoomApi(createRoomBodySchema.parse(body)),
    throwOnError: isAxiosError,
  });
}
