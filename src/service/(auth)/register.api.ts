import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { tokenSchema } from "@/lib/schemas/token.schema";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const registerBodySchema = z
  .object({
    email: z.string().email(),
    password1: z.string().min(8, "Password must be at least 8 characters."),
    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Password don't match.",
    path: ["password1"],
  });

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;

const registerUserSchema = userSchema.omit({
  id: true,
  pk: true,
  last_login: true,
  is_superuser: true,
  is_staff: true,
  date_joined: true,
});

export const registerResponseSchema = z.object({
  tokenSchema,
  user: registerUserSchema,
});

export type RegisterResponseSchema = z.infer<typeof registerResponseSchema>;

export async function registerApi(
  body: RegisterBodySchema
): Promise<RegisterResponseSchema> {
  const response = await apiClient.post<RegisterResponseSchema>(
    "/auth/registration/",
    body
  );

  return response.data;
}

export function useRegisterMutation() {
  // const queryClient = getQueryClient();
  const mutationKey = ["register"] as const;

  return useMutation<RegisterResponseSchema, unknown, RegisterBodySchema>({
    mutationKey,
    mutationFn: (body) => registerApi(body),
    throwOnError: isAxiosError,
  });
}
