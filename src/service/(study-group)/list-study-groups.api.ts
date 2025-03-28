import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { studyGroupSchema } from "@/lib/schemas/study-group/study-group.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listStudyGroupResponseSchema =
  createListResponseSchema(studyGroupSchema);

export type ListStudyGroupResponse = z.infer<
  typeof listStudyGroupResponseSchema
>;

export async function listStudyGroupsApi() : Promise<ListStudyGroupResponse> {
  
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
