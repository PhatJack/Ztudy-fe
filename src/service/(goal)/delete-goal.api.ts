import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export async function deleteGoalApi(id: number): Promise<void> {
  await apiClient.delete<void>(`/session-goals/${id}/`);
}

export function useDeleteGoalMutation() {
  const queryClient = getQueryClient();

  return useMutation<void, unknown, number>({
    mutationKey: ["delete-goal"],
    mutationFn: (id) => deleteGoalApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    throwOnError: true,
  });
}
