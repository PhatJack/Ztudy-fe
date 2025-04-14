import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { userFavoriteVideoSchema } from "@/lib/schemas/user-favorite-video/user-favorite-video.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createUserFavoriteVideoSchema = userFavoriteVideoSchema
  .omit({
    id: true,
    image: true,
		name: true,
		created_at: true,
  })
  .partial({
    user: true,
  });

export type CreateUserFavoriteVideoSchema = z.infer<
  typeof createUserFavoriteVideoSchema
>;

export const createUserFavoriteVideoApi = async (
  data: CreateUserFavoriteVideoSchema
) => {
  const res = await apiClient.post("/user-favorite-videos/", data);
  return res;
};

export const useCreateUserFavoriteVideoApi = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["create-user-favorite-video"],
    mutationFn: (data: CreateUserFavoriteVideoSchema) =>
      createUserFavoriteVideoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-favorite-videos"] });
    },
  });
};
