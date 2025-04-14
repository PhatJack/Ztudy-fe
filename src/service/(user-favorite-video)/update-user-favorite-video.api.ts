import { z } from "zod";
import { createUserFavoriteVideoSchema } from "./add-user-favorite-video.api";
import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const updateUserFavoriteVideoSchema =
  createUserFavoriteVideoSchema.partial();

export type UpdateUserFavoriteVideoSchema = z.infer<
  typeof updateUserFavoriteVideoSchema
>;

export const updateUserFavoriteVideoApi = async (
  id: number,
  data: UpdateUserFavoriteVideoSchema
) => {
  const res = await apiClient.patch(`/user-favorite-videos/${id}/`, data);
  return res;
};

export const useUpdateUserFavoriteVideoApi = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateUserFavoriteVideoSchema;
    }) =>
      updateUserFavoriteVideoApi(id, updateUserFavoriteVideoSchema.parse(data)),
  });
};
