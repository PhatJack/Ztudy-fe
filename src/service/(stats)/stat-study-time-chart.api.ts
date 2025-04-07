import { apiClient } from "@/lib/client";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

// Define the filter options
export type StudyTimeChartFilter = "today" | "this_week" | "this_month";

// Define the response schema
export const statStudyTimeChartResponseSchema = z.object({
  data: z.array(
    z.object({
      date: z.string(),
      total_study: z.number(),
    })
  ),
});

export type StatStudyTimeChartResponseSchema = z.infer<
  typeof statStudyTimeChartResponseSchema
>;

export const statStudyTimeChart = async (
  filter: StudyTimeChartFilter = "today"
): Promise<StatStudyTimeChartResponseSchema> => {
  const response = await apiClient.get("/stats/study-time-chart/", {
    filter: filter,
  });
  return statStudyTimeChartResponseSchema.parse(response.data);
};

export const useStatStudyTimeChart = (
  filter: StudyTimeChartFilter = "today"
) => {
  return queryOptions<StatStudyTimeChartResponseSchema>({
    queryKey: ["stat-study-time-chart", filter],
    queryFn: () => statStudyTimeChart(filter),
    throwOnError: isAxiosError,
  });
};
