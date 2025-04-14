import { apiClient } from "@/lib/client";
import { userFavoriteVideoSchema } from "@/lib/schemas/user-favorite-video/user-favorite-video.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createUserFavoriteVideoSchema = userFavoriteVideoSchema
  .omit({
    id: true,
  })
  .partial({
    user: true,
    image: true,
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
  return useMutation({
    mutationFn: (data: CreateUserFavoriteVideoSchema) =>
      createUserFavoriteVideoApi(data),
  });
};
