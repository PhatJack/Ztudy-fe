import { apiClient } from "@/lib/client";
import { changePasswordSchema } from "@/lib/schemas/user/change-password.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const editChangePasswordBodySchema = changePasswordSchema;

export type EditChangePasswordBodySchema = z.infer<
  typeof editChangePasswordBodySchema
>;

export const editChangePasswordResponseSchema = z.object({
  detail: z.string(),
});

export type EditChangePasswordResponseSchema = z.infer<
  typeof editChangePasswordResponseSchema
>;

export const editChangePasswordApi = async (
  body: EditChangePasswordBodySchema
): Promise<EditChangePasswordResponseSchema> => {
  const res = await apiClient.post("/auth/password/change/", body);
  return editChangePasswordResponseSchema.parse(res.data);
};

export const useEditChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ["edit-change-password"],
    mutationFn: (body: EditChangePasswordBodySchema) =>
      editChangePasswordApi(body),
    throwOnError: isAxiosError,
  });
};
