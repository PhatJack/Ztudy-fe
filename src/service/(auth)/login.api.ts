import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { tokenSchema } from "@/lib/schemas/token.schema";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;

const loginUserSchema = userSchema.pick({
  id: true,
  avatar: true,
	last_login: true,
  username: true,
  first_name: true,
  last_name: true,
  is_active: true,
  date_joined: true,
  email: true,
  is_online: true,
	created_at: true,
	updated_at: true,
  monthly_study_time: true,
  monthly_level: true,
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
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
