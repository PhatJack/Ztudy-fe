import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const addInterestsResponseSchema = z.object({
  message: z.string(),
});

export type AddInterestsResponseSchema = z.infer<
  typeof addInterestsResponseSchema
>;

export const addInterestsBodySchema = z.object({
  category_ids: z.array(z.number()),
});

export type AddInterestsBodySchema = z.infer<typeof addInterestsBodySchema>;

export async function addInterestsApi(
  id: number,
  body: AddInterestsBodySchema
) {
  const res = await apiClient.post(`/users/${id}/add-interests/`, body);
  return res;
}

export function useAddInterestsMutation() {
  return useMutation({
    mutationKey: ["add-interests", "suggested-rooms"],
    mutationFn: ({ id, body }: { id: number; body: AddInterestsBodySchema }) =>
      addInterestsApi(id, body),
    throwOnError: isAxiosError,
  });
}
