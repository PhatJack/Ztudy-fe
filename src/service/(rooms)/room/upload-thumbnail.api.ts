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
export const uploadThumbnailBodySchema = z.object({
  thumbnail: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type UploadThumbnailBodySchema = z.infer<typeof uploadThumbnailBodySchema>;

export const uploadThumbnailResponseSchema = z.object({
  thumbnail: z.string(),
});

export type UploadThumbnailResponseSchema = z.infer<
  typeof uploadThumbnailResponseSchema
>;

export async function uploadThumbnailApi(
  id: number,
  body: UploadThumbnailBodySchema
): Promise<UploadThumbnailResponseSchema> {
  const response = await apiClient.post<{ thumbnail: string }>(
    `/rooms/${id}/upload-thumbnail/`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export function useUploadThumbnailMutation() {
  return useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: ({ id, body }: { id: number; body: UploadThumbnailBodySchema }) =>
      uploadThumbnailApi(id, body),
  });
}
