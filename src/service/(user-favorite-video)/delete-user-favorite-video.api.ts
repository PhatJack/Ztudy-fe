import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const deleteUserFavoriteVideoApi = async (id: number) => {
  const res = await apiClient.delete(`/user-favorite-videos/${id}/`);
  return res;
};

export const useDeleteUserFavoriteVideoApi = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["delete-user-favorite-video"],
    mutationFn: (id: number) => deleteUserFavoriteVideoApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-favorite-videos"] });
    },
  });
};
