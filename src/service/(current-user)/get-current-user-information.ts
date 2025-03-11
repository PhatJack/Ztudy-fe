import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/client";
import { userSchema } from "@/lib/schemas/user/user.schema";

export const currentUserResponseSchema = userSchema.omit({
  password: true,
  is_staff: true,
  is_superuser: true,
});
export type CurrentUserResponseSchema = z.infer<
  typeof currentUserResponseSchema
>;

export async function getCurrentUserInformationApi() : Promise<CurrentUserResponseSchema> {
  const response = await apiClient.get<CurrentUserResponseSchema>(
    "/auth/user/"
  );
  return response.data;
}

export function createGetCurrentUserInformationQueryOptions() {
  return queryOptions({
    queryKey: ["users", "current-user", "information"],
    queryFn: () => getCurrentUserInformationApi(),
  });
}
