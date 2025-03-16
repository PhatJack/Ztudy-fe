import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { studyGroupSchema } from "@/lib/schemas/study-group/study-group.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const createStudyGroupBodySchema = studyGroupSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  is_active: true,
  code_invite: true,
	thumbnail: true,
});

export type CreateStudyGroupBodySchema = z.infer<
  typeof createStudyGroupBodySchema
>;

const createStudyGroupResponseSchema = studyGroupSchema;

export type CreateStudyGroupResponseSchema = z.infer<
  typeof createStudyGroupResponseSchema
>;

export async function createStudyGroupApi(
  body: CreateStudyGroupBodySchema
): Promise<CreateStudyGroupResponseSchema> {
  const res = await apiClient.post<CreateStudyGroupResponseSchema>(
    "/study-groups/",
    body
  );
  return res.data;
}

export function useCreateStudyGroupMutation() {
  const queryClient = getQueryClient();
  const mutationKey = ["create-study-group"] as const;
  return useMutation<
    CreateStudyGroupResponseSchema,
    unknown,
    CreateStudyGroupBodySchema
  >({
    mutationKey,
    mutationFn: (body: CreateStudyGroupBodySchema) =>
      createStudyGroupApi(createStudyGroupBodySchema.parse(body)),
    throwOnError: isAxiosError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
}
