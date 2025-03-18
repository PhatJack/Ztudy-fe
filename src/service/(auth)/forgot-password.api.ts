import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const forgotPasswordStep1BodySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ForgotPasswordStep1BodySchema = z.infer<
  typeof forgotPasswordStep1BodySchema
>;

export const forgotPasswordStep2BodySchema = z
  .object({
    new_password1: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    new_password2: z.string(),
    uid: z.string(),
    token: z.string(),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords do not match",
    path: ["new_password2"],
  });

export type ForgotPasswordStep2BodySchema = z.infer<
  typeof forgotPasswordStep2BodySchema
>;

export const forgotPasswordStep1ResponseSchema = z.object({
  detail: z.string(),
});

export type ForgotPasswordStep1ResponseSchema = z.infer<
  typeof forgotPasswordStep1ResponseSchema
>;

export async function postForgotPasswordStep1Api(
  body: ForgotPasswordStep1BodySchema
): Promise<ForgotPasswordStep1ResponseSchema> {
  const res = await apiClient.post("/auth/password/reset/", body);
  return forgotPasswordStep1ResponseSchema.parse(res.data);
}

export const usePostForgotPasswordStep1Mutation = () => {
  return useMutation({
    mutationKey: ["post-forgot-password-step1"],
    mutationFn: (body: ForgotPasswordStep1BodySchema) =>
      postForgotPasswordStep1Api(body),
    throwOnError: isAxiosError,
  });
};

export async function postForgotPasswordStep2Api(
  body: ForgotPasswordStep2BodySchema
): Promise<ForgotPasswordStep1ResponseSchema> {
  const res = await apiClient.post("/auth/password/reset/confirm/", body);
  return forgotPasswordStep1ResponseSchema.parse(res.data);
}

export const usePostForgotPasswordStep2Mutation = () => {
  return useMutation({
    mutationKey: ["post-forgot-password-step2"],
    mutationFn: (body: ForgotPasswordStep2BodySchema) =>
      postForgotPasswordStep2Api(body),
    throwOnError: isAxiosError,
  });
};
