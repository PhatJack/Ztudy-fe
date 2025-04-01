import { apiClient } from "@/lib/client";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const checkPreferenceResponseSchema = z.object({
  message: z.string(),
});

export type CheckPreferenceResponseSchema = z.infer<
  typeof checkPreferenceResponseSchema
>;

export async function checkPreferencesApi(id: number) {
  const res = await apiClient.get(`/users/${id}/check-preferences/`);
  return res;
}

export function useCheckPreferencesQuery(id: number) {
  return queryOptions({
    queryKey: ["check-preferencces-user"],
    queryFn: () => checkPreferencesApi(id),
    throwOnError: isAxiosError,
  });
}
