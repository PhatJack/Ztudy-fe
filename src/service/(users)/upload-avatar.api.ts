import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const uploadAvatarBodySchema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type UploadAvatarBodySchema = z.infer<typeof uploadAvatarBodySchema>;

export const uploadAvatarResponseSchema = z.object({
  avatar: z.string(),
});

export type UploadAvatarResponseSchema = z.infer<
  typeof uploadAvatarResponseSchema
>;

export async function uploadAvatarApi(
  id: number,
  body: UploadAvatarBodySchema
): Promise<UploadAvatarResponseSchema> {
  const response = await apiClient.post<{ avatar: string }>(
    `/users/${id}/upload-avatar/`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export function useUploadAvatarMutation() {
  return useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: ({ id, body }: { id: number; body: UploadAvatarBodySchema }) =>
      uploadAvatarApi(id, body),
  });
}
