import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { studyGroupSchema } from "@/lib/schemas/study-group/study-group.schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listStudyGroupResponseSchema =
  createListResponseSchema(studyGroupSchema);

export type ListStudyGroupResponse = z.infer<
  typeof listStudyGroupResponseSchema
>;

export async function listStudyGroupsApi() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await apiClient.get<ListStudyGroupResponse>("/rooms/");
  return res.data;
}

export function useListStudyGroups() {
  const queryKey = ["rooms"] as const;

  return queryOptions<ListStudyGroupResponse>({
    queryKey,
    queryFn: listStudyGroupsApi,
    throwOnError: isAxiosError,
  });
}
