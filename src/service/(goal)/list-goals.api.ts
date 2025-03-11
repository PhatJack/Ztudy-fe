import { apiClient } from "@/lib/client";
import { goalSchema } from "@/lib/schemas/goal/goal.schema";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const goalQuerySchema = paginationRequestSchema.extend({
  expand: z.string().optional(),
  user: z.number().optional(),
});

export type GoalQuerySchema = z.infer<typeof goalQuerySchema>;

export const goalResponseBodySchema = createListResponseSchema(goalSchema);

export type GoalResponseBodySchema = z.infer<typeof goalResponseBodySchema>;

export async function listGoalsApi(
  query: GoalQuerySchema
): Promise<GoalResponseBodySchema> {
  const response = await apiClient.get<GoalResponseBodySchema>(
    "/session-goals/",
    query
  );
  return goalResponseBodySchema.parse(response.data);
}

export const useListGoals = (query: GoalQuerySchema = {}) => {
  const queryKey = ["goals", query] as const;
  return queryOptions<GoalResponseBodySchema>({
    queryKey,
    queryFn: () => listGoalsApi(goalQuerySchema.parse(query)),
    enabled: !!query?.user,
    throwOnError: isAxiosError,
  });
};
