import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const deleteUserFavoriteVideoApi = async (id: number) => {
  const res = await apiClient.delete(`/user-favorite-videos/${id}/`);
  return res;
};

export const useDeleteUserFavoriteVideoApi = () => {
  return useMutation({
    mutationFn: (id: number) => deleteUserFavoriteVideoApi(id),
  });
};
