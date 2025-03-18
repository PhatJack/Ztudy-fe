import { apiClient } from "@/lib/client";
import { goalSchema } from "@/lib/schemas/goal/goal.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const createGoalBodySchema = goalSchema.omit({
  id: true,
  updated_at: true,
});

export type CreateGoalBodySchema = z.infer<typeof createGoalBodySchema>;

export const createGoalResponseSchema = goalSchema;

export type CreateGoalResponseSchema = z.infer<typeof createGoalResponseSchema>;

export async function createGoalApi(
  body: CreateGoalBodySchema
): Promise<CreateGoalResponseSchema> {
  const response = await apiClient.post<CreateGoalResponseSchema>(
    "/session-goals/",
    body
  );
  return response.data
}

export function useCreateGoalMutation() {
  const mutationKey = ["create-goal"] as const;
  return useMutation<CreateGoalResponseSchema, unknown, CreateGoalBodySchema>({
    mutationKey,
    mutationFn: (body) => createGoalApi(createGoalBodySchema.parse(body)),
    throwOnError: isAxiosError,
  });
}
