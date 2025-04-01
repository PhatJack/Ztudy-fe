import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { goalSchema } from "@/lib/schemas/goal/goal.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const patchGoalBodySchema = goalSchema.omit({
  updated_at: true,
  user: true,
});

export type PatchGoalBodySchema = z.infer<typeof patchGoalBodySchema>;

export const patchGoalResponseSchema = goalSchema;

export type PatchGoalResponseSchema = z.infer<typeof patchGoalResponseSchema>;

export async function patchGoalApi(
  id: number,
  body: PatchGoalBodySchema
): Promise<PatchGoalResponseSchema> {
  const response = await apiClient.patch<PatchGoalResponseSchema>(
    `/session-goals/${id}/`,
    body
  );
  return patchGoalResponseSchema.parse(response.data);
}

export function usePatchGoalMutation() {
  const queryClient = getQueryClient();
  return useMutation<PatchGoalResponseSchema, unknown, PatchGoalBodySchema>({
    mutationKey: ["patch-goal"],
    mutationFn: (body) =>
      patchGoalApi(body.id, patchGoalBodySchema.parse(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    throwOnError: true,
  });
}
