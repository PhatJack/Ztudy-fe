import { apiClient } from "@/lib/client";
import { z } from "zod";

export const getAgoraTokenBodySchema = z.object({
  channel: z.string(),
});

export type GetAgoraTokenBodySchema = z.infer<typeof getAgoraTokenBodySchema>;

export const getAgoraTokenResponseSchema = z.object({
  token: z.string(),
  uid: z.number(),
  app_id: z.string(),
  channel: z.string(),
  expires_in: z.number(),
});

export type GetAgoraTokenResponseSchema = z.infer<
  typeof getAgoraTokenResponseSchema
>;

export const getAgoraTokenApi = async (body: GetAgoraTokenBodySchema) => {
  const res = await apiClient.get("/agora/token/", body);
  return res;
};
