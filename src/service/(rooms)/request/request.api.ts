import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const approveRequest = async (roomCode: string, requestId: number) => {
  const response = await apiClient.post(
    `/rooms/${roomCode}/approve/${requestId}/`,
    {}
  );
  return response.data;
};

export const rejectRequest = async (roomCode: string, requestId: number) => {
  const response = await apiClient.post(
    `/rooms/${roomCode}/reject/${requestId}/`,
    {}
  );
  return response.data;
};

export const assignAdmin = async (roomCode: string, userId: number) => {
  const response = await apiClient.post(
    `/rooms/${roomCode}/assign-admin/${userId}/`,
    {}
  );
  return response.data;
};

export const useApproveRequestMutation = () => {
  return useMutation({
    mutationKey: ["approveRequest"],
    mutationFn: ({
      roomCode,
      requestId,
    }: {
      roomCode: string;
      requestId: number;
    }) => approveRequest(roomCode, requestId),
  });
};

export const useRejectRequestMutation = () => {
  return useMutation({
    mutationKey: ["rejectRequest"],
    mutationFn: ({
      roomCode,
      requestId,
    }: {
      roomCode: string;
      requestId: number;
    }) => rejectRequest(roomCode, requestId),
  });
};

export const useAssignAdminMutation = () => {
  return useMutation({
    mutationKey: ["assignAdmin"],
    mutationFn: ({ roomCode, userId }: { roomCode: string; userId: number }) =>
      assignAdmin(roomCode, userId),
  });
};
