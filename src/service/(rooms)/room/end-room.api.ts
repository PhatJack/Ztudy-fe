import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export async function endRoomApi(roomCode: string) {
  const response = await apiClient.post(`/rooms/${roomCode}/end/`, {});
  return response.data;
}

export function useEndRoomMutation() {
  const mutationKey = ["end-room"];
  return useMutation<any, Error, string>({
    mutationKey,
    mutationFn: (roomCode: string) => endRoomApi(roomCode),
    throwOnError: isAxiosError,
  });
} 