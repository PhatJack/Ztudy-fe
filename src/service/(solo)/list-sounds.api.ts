import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { soundSchema } from "@/lib/schemas/solo/sound.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listSoundsResponseSchema = createListResponseSchema(soundSchema);

export type ListSoundsResponseSchema = z.infer<typeof listSoundsResponseSchema>;

export async function listSoundsApi() {
  const res = await apiClient.get<ListSoundsResponseSchema>("/sounds/");
  return res.data;
}

export const useListSounds = () => {
  const queryKey = ["sounds"] as const;
  return queryOptions<ListSoundsResponseSchema>({
    queryKey,
    queryFn: listSoundsApi,
    throwOnError: isAxiosError,
  });
};
