import { apiClient } from "@/lib/client";
import { queryOptions } from "@tanstack/react-query";
import {
  currentUserResponseSchema,
  CurrentUserResponseSchema,
} from "../(current-user)/get-current-user-information.api";

export const getUserByIdApi = async (
  id: string
): Promise<CurrentUserResponseSchema> => {
  const response = await apiClient.get(`/users/${id}/`);
  return currentUserResponseSchema.parse(response.data);
};

export const useGetUserById = (id: string) => {
  return queryOptions({
    queryKey: ["users", id],
    queryFn: () => getUserByIdApi(id),
    enabled: !!id,
  });
};
