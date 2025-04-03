import { getQueryClient } from "@/app/get-query-client";
import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export async function logoutApi(body: any): Promise<void> {
  await apiClient.post("/auth/logout/", body);
}

export function useLogoutMutation(body: object = {}) {
  const queryClient = getQueryClient();

  return useMutation<any, void, any>({
    mutationKey: ["logout"],
    mutationFn: () => logoutApi(body),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
