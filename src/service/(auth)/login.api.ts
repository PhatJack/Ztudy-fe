import { getQueryClient } from "@/app/get-query-client";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from "@/constants/cookies";
import { apiClient } from "@/lib/client";
import { tokenSchema } from "@/lib/schemas/token.schema";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;

const loginUserSchema = userSchema.omit({
  id: true,
  last_login: true,
  is_superuser: true,
  is_staff: true,
  date_joined: true,
  restored_at: true,
  transaction_id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  password: true,
});

export const loginResponseSchema = z.object({
  user: loginUserSchema,
  access: tokenSchema.pick({ access: true }),
  refresh: tokenSchema.pick({ refresh: true }),
});
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export const loginErrorResponseSchema = z.object({
  message: z.string(),
});
export type LoginErrorResponseSchema = z.infer<typeof loginErrorResponseSchema>;
export async function signInApi(
  body: LoginBodySchema
): Promise<LoginResponseSchema> {
  const response = await apiClient.post<LoginResponseSchema>(
    "/auth/login/",
    body
  );
  return response.data;
}

export function useLoginMutation() {
  const queryClient = getQueryClient();
  return useMutation<
    LoginResponseSchema,
    LoginErrorResponseSchema,
    LoginBodySchema
  >({
    mutationKey: ["login"],
    mutationFn: (body: LoginBodySchema) => signInApi(body),
    onSuccess: (data) => {
      setCookie(COOKIE_KEY_ACCESS_TOKEN, data.access);
      setCookie(COOKIE_KEY_REFRESH_TOKEN, data.refresh);
      queryClient.resetQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
