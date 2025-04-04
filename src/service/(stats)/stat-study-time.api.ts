import { apiClient } from "@/lib/client";
import { monthlyLevelSchema } from "@/lib/schemas/monthly-level.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const statStudyTimeResponseSchema = z.object({
  study: z.object({
    today: z.number(),
    week: z.number(),
    month: z.number(),
  }),
  rank: z.object({
    today: z.union([z.literal("unranked"), z.number()]), // or z.string() if you want to be more flexible
    week: z.union([z.literal("unranked"), z.number()]),
    month: z.union([z.literal("unranked"), z.number()]),
  }),
  current_monthly_level: z.object({
    level: monthlyLevelSchema,
    next_level: monthlyLevelSchema,
    progress: z.number(),
    time_to_next_level: z.number(),
  }),
});

// You can then derive TypeScript types from this schema:
export type StatStudyTimeResponseSchema = z.infer<
  typeof statStudyTimeResponseSchema
>;

export const statStudyTime = async (): Promise<StatStudyTimeResponseSchema> => {
  const response = await apiClient.get("/stats/study-time/");
  return statStudyTimeResponseSchema.parse(response.data);
};

export const useStatStudyTime = () => {
  return queryOptions<StatStudyTimeResponseSchema>({
    queryKey: ["stat-study-time"],
    queryFn: statStudyTime,
    throwOnError: isAxiosError,
  });
};
