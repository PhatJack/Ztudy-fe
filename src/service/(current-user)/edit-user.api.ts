import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { userSchema } from "@/lib/schemas/user/user.schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";
import { currentUserResponseSchema } from "./get-current-user-information.api";

export const editUserBodySchema = userSchema
  .omit({
    is_online: true,
    is_active: true,
    last_login: true,
    date_joined: true,
    password: true,
    avatar: true,
    created_at: true,
    updated_at: true,
  })
  .partial();

export type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

export const editUserResponseSchema = currentUserResponseSchema;

export type EditUserResponseSchema = z.infer<typeof editUserResponseSchema>;

export const editUserApi = async (
  body: EditUserBodySchema
): Promise<EditUserResponseSchema> => {
  const res = await apiClient.patch("/auth/user/", body);
  return editUserResponseSchema.parse(res.data);
};

export const useEditUserMutation = () => {
  const queryClient = getQueryClient();

  return useMutation<EditUserResponseSchema, unknown, EditUserBodySchema>({
    mutationKey: ["edit-user"],
    mutationFn: (body: EditUserBodySchema) => editUserApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
    throwOnError: isAxiosError,
  });
};
