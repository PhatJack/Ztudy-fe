import { apiClient } from "@/lib/client";
import { z } from "zod";

export const refreshTokenBodySchema = z.object({
  refresh: z.string(),
});
export type RefreshTokenBody = z.infer<typeof refreshTokenBodySchema>;
export const refreshTokenResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});
export type RefreshTokenResponseSchema = z.infer<
  typeof refreshTokenResponseSchema
>;

export async function refreshTokenApi(
  body: RefreshTokenBody
): Promise<RefreshTokenResponseSchema> {
  const response = await apiClient.post<RefreshTokenResponseSchema>(
    "/auth/token/refresh",
    body
  );
  return response.data;
}
