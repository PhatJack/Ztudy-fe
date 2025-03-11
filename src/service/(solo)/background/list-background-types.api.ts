import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { backgroundVideoTypeSchema } from "@/lib/schemas/solo/background-video-type.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const backgroundVideoTypesListReponseSchema = createListResponseSchema(
  backgroundVideoTypeSchema
);

export type BackgroundVideoTypesListResponseSchema = z.infer<
  typeof backgroundVideoTypesListReponseSchema
>;

export async function listBackgroundVideoTypesApi(): Promise<BackgroundVideoTypesListResponseSchema> {
  const response = await apiClient.get<BackgroundVideoTypesListResponseSchema>(
    "/background-video-types/"
  );

  return response.data;
}

export function useListBackgroundVideoTypes() {
  const queryKey = ["background-video-types"] as const;

  return queryOptions<BackgroundVideoTypesListResponseSchema>({
    queryKey,
    queryFn: listBackgroundVideoTypesApi,
    throwOnError: isAxiosError,
  });
}
