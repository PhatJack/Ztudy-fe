import { apiClient } from "@/lib/client";
import { leaderboardSchema } from "@/lib/schemas/leaderboard/leaderboard.schema";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

export const listLeaderboardSuccessResponseSchema = z.object({
  leaderboard: createListResponseSchema(leaderboardSchema),
  next_update_timestamp: z.number(),
  seconds_until_next_update: z.number(),
});

export type ListLeaderboardSuccessResponseSchema = z.infer<
  typeof listLeaderboardSuccessResponseSchema
>;

export const listLeaderboardQuerySchema = paginationRequestSchema;

export type ListLeaderboardQuerySchema = z.infer<
  typeof listLeaderboardQuerySchema
>;
export async function listLeaderboardApi(
  period: string,
  query: ListLeaderboardQuerySchema = {}
): Promise<ListLeaderboardSuccessResponseSchema> {
  const response = await apiClient.get(`/stats/leaderboard/${period}/`, query);
	if(response.status !== 200) {
    throw new Error(typeof response.data === "string" ? response.data : "An unknown error occurred");
	}
  return listLeaderboardSuccessResponseSchema.parse(response.data);
}

export function useListLeaderboardApi(
  period: string,
  query: ListLeaderboardQuerySchema = {}
) {
  return queryOptions<ListLeaderboardSuccessResponseSchema,unknown>({
    queryKey: ["leaderboard", period],
    queryFn: () => listLeaderboardApi(period, query),
    throwOnError: true,
    enabled: !!period,
  });
}
