import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { studyRoomCategoriesSchema } from "@/lib/schemas/study-group/study-room-categories.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listRoomCategoriesResponseSchema = createListResponseSchema(
  studyRoomCategoriesSchema
);

export type ListRoomCategoriesResponseSchema = z.infer<
  typeof listRoomCategoriesResponseSchema
>;

export async function listRoomCategoriesApi() {
  const res = await apiClient.get<ListRoomCategoriesResponseSchema>(
    "/room-categories/"
  );

  return res.data;
}

export const useStudyListRoomCategories = () => {
  const queryKey = ["room-categories"] as const;

  return queryOptions<ListRoomCategoriesResponseSchema>({
    queryKey,
    queryFn: listRoomCategoriesApi,
    throwOnError: isAxiosError,
  });
};
