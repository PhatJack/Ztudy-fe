import { apiClient } from "@/lib/client";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const statStudyTimeResponseSchema = z.object({
  daily_study: z.number(),
  weekly_study: z.number(),
  monthly_study: z.number(),
  all_time: z.number(),
});

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
