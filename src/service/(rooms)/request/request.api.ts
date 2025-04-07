import { apiClient } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const cancelRequest = async (roomCode: string) => {
  const response = await apiClient.post(`/rooms/${roomCode}/cancel-join/`, {});
  return response.data;
};

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

export const assignModerator = async (roomCode: string, userId: number) => {
  const response = await apiClient.post(
    `/rooms/${roomCode}/assign-moderator/${userId}/`,
    {}
  );
  return response.data;
};

export const revokeModerator = async (roomCode: string, userId: number) => {
  const response = await apiClient.post(
    `/rooms/${roomCode}/revoke-moderator/${userId}/`,
    {}
  );
  return response.data;
};

export const useCancelRequestMutation = () => {
  return useMutation({
    mutationKey: ["cancel-request"],
    mutationFn: (roomCode: string) => cancelRequest(roomCode),
  });
};

export const useApproveRequestMutation = () => {
  return useMutation({
    mutationKey: ["approve-request"],
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
    mutationKey: ["reject-request"],
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
    mutationKey: ["assign-moderator"],
    mutationFn: ({ roomCode, userId }: { roomCode: string; userId: number }) =>
      assignModerator(roomCode, userId),
  });
};

export const useRevokeAdminMutation = () => {
  return useMutation({
    mutationKey: ["revoke-admin"],
    mutationFn: ({ roomCode, userId }: { roomCode: string; userId: number }) =>
      revokeModerator(roomCode, userId),
  });
};
