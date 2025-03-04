import { getQueryClient } from "@/app/get-query-client";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from "@/constants/cookies";
import { apiClient } from "@/lib/client";
import { tokenSchema } from "@/lib/schemas/token.schema";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginBodySchema = z.infer<typeof loginBodySchema>;
export const loginResponseSchema = z.object({
  message: z.string(),
  tokens: tokenSchema,
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

export function useSignInMutation() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (body: LoginBodySchema) => signInApi(body),
    onSuccess: (data) => {
      console.log(data);
      // setCookie(COOKIE_KEY_ACCESS_TOKEN, data.tokens.accessToken);
      // setCookie(COOKIE_KEY_REFRESH_TOKEN, data.tokens.refreshToken);
      // queryClient.resetQueries({
      //   queryKey: ["current-user"],
      // });
    },
  });
}
