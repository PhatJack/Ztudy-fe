import { z } from "zod";

export const accessTokenSchema = z.string();
export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
export const refreshTokenSchema = z.string();
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;

export const tokenSchema = z.object({
  accessToken: accessTokenSchema,
  refreshToken: refreshTokenSchema,
});
export type TokenSchema = z.infer<typeof tokenSchema>;
