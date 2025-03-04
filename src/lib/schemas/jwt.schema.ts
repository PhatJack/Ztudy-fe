import { z } from "zod";

// Schema for the JWT header
const headerSchema = z.object({
  alg: z.literal("HS256"), // Restricting to "HS256" as per your example
  typ: z.literal("JWT"), // Restricting to "JWT" as per your example
});

// Schema for the JWT payload
const payloadSchema = z.object({
  token_type: z.literal("access"), // Restricting to "access" as per your example
  exp: z.number().int(), // Integer timestamp for expiration
  iat: z.number().int(), // Integer timestamp for issued-at
  jti: z.string().length(32), // 32-character string based on your example
  user_id: z.number().int(), // Integer user ID
});

// Combined schema for the entire JWT object
export const jwtSchema = z.object({
  header: headerSchema,
  payload: payloadSchema,
});

// Type inference for TypeScript
export type JwtType = z.infer<typeof jwtSchema>;
