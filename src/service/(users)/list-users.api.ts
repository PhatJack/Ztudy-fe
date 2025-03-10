import { apiClient } from "@/lib/client";
import {
  createListResponseSchema,
  paginationRequestSchema,
} from "@/lib/schemas/pagination.schema";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const listUsersQuerySchema = paginationRequestSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
});

export type ListUsersQuerySchema = z.infer<typeof listUsersQuerySchema>;

export const listUsersResponseSchema = createListResponseSchema(userSchema);

export type ListUsersResponse = z.infer<typeof listUsersResponseSchema>;

export async function listUsersApi(
  query?: ListUsersQuerySchema
): Promise<ListUsersResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await apiClient.get<ListUsersResponse>("/users/", query ?? {});
  return res.data;
}

export function useListUsers(query?: ListUsersQuerySchema) {
  const queryKey = ["users", query] as const;

  return queryOptions<ListUsersResponse>({
    queryKey,
    queryFn: () => listUsersApi(listUsersQuerySchema.parse(query ?? {})),
    throwOnError: isAxiosError,
  });
}
