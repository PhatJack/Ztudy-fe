"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import RoomItem from "@/components/rooms/room-item";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useChatContext } from "@/hooks/useChatContext";
import { useJoinRoomMutation } from "@/service/(rooms)/room/join-room.api";
import { useListSuggestedRooms } from "@/service/(rooms)/room/list-suggested-rooms.api";
import { useListTrendingRooms } from "@/service/(rooms)/room/list-trending-rooms.api";
import { useListRooms } from "@/service/(rooms)/room/list-rooms.api";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import React, { useMemo, useState } from "react";
import AddNewRoomModal from "./AddNewRoomModal";
import JoinRoomWithCode from "./JoinRoomWithCode";
import { useJoinRandomRoomMutation } from "@/service/(rooms)/room/join-random-room.api";
import JoinRandomRoomButton from "./JoinRandomRoomButton";
import { useAuthContext } from "@/hooks/useAuthContext";
import PaginationCustom from "@/components/pagination/PaginationCustom";

const RoomsContainer = () => {
  const { connectChatSocket } = useRoomWebSocket();
  const { setIsPending, setCurrentRoom, setIsAdmin } = useChatContext();
  const router = useRouter();
  const [state] = useAuthContext();
  const joinRoomMutation = useJoinRoomMutation();
  const joinRandomRoomMutation = useJoinRandomRoomMutation();

  // Pagination states for each room type
  const [yourRoomsPage, setYourRoomsPage] = useState<number>(1);
  const [suggestedRoomsPage, setSuggestedRoomsPage] = useState<number>(1);
  const [trendingRoomsPage, setTrendingRoomsPage] = useState<number>(1);

  const [yourRoomsQuery, suggestedRoomsQuery, trendingRoomsQuery] = useQueries({
    queries: [
      {
        ...useListRooms({
          expand: "category",
          creator_user: state.user?.id,
          page: yourRoomsPage,
        }),
        enabled: !!state.user?.id,
      },
      useListSuggestedRooms({
        expand: "category",
        page: suggestedRoomsPage,
      }),
      useListTrendingRooms({
        expand: "category",
        page: trendingRoomsPage,
      }),
    ],
  });
  const { yourRooms, suggestedRooms, trendingRooms } = useMemo(
    () => ({
      yourRooms: yourRoomsQuery.data?.results || [],
      suggestedRooms: suggestedRoomsQuery.data?.results || [],
      trendingRooms: trendingRoomsQuery.data?.results || [],
    }),
    [yourRoomsQuery.data, suggestedRoomsQuery.data, trendingRoomsQuery.data]
  );

  const handleJoinRoom = (roomCode: string) => {
    joinRoomMutation.mutate(roomCode.trim(), {
      onSuccess: (data) => {
        if (data.status === 202) {
          setIsPending(true);
        }
        setCurrentRoom(data.data.room);
        setIsAdmin(data.data.participant.role == "ADMIN");
        connectChatSocket(roomCode.trim());
        router.push(`/room/${roomCode}`);
      },
    });
  };

  const handleJoinRandomRoom = () => {
    joinRandomRoomMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data.status === 202) {
          setIsPending(true);
        }
        setCurrentRoom(data.data.room);
        setIsAdmin(data.data.participant.is_admin);
        connectChatSocket(data.data.room.code_invite);
        router.push(`/room/${data.data.room.code_invite}`);
      },
    });
  };

  const isLoadingYourRooms = yourRoomsQuery.isLoading;
  const isLoadingSuggested = suggestedRoomsQuery.isLoading;
  const isLoadingTrending = trendingRoomsQuery.isLoading;

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full flex justify-between items-center">
        <div className=""></div>
        <div className="flex items-center gap-2">
          <JoinRandomRoomButton handleJoinRandomRoom={handleJoinRandomRoom} />
          <JoinRoomWithCode handleJoinRoom={handleJoinRoom} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold uppercase">Your Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="min-w-[200px]">
            <AddNewRoomModal />
          </div>
          {isLoadingYourRooms ? (
            <LoadingSpinner className="col-span-full" />
          ) : yourRooms.length === 0 ? (
            <p></p>
          ) : (
            <>
              {yourRooms.map((room, index) => (
                <RoomItem
                  key={index}
                  showType={true}
                  room={room}
                  handleJoinRoom={() => handleJoinRoom(room.code_invite)}
                />
              ))}
            </>
          )}
        </div>
        {yourRooms.length > 0 && (
          <PaginationCustom
            onPageChange={(page) => setYourRoomsPage(page)}
            currentPage={yourRoomsPage}
            totalPages={yourRoomsQuery.data?.totalPages}
          />
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold uppercase">Suggested Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {isLoadingSuggested ? (
            <LoadingSpinner className="col-span-full" />
          ) : suggestedRooms.length === 0 ? (
            <p>No suggested rooms available.</p>
          ) : (
            <>
              {suggestedRooms.map((room, index) => (
                <RoomItem
                  key={index}
                  room={room}
                  handleJoinRoom={() => handleJoinRoom(room.code_invite)}
                />
              ))}
            </>
          )}
        </div>
        {suggestedRooms.length > 0 && (
          <PaginationCustom
            onPageChange={(page) => setSuggestedRoomsPage(page)}
            currentPage={suggestedRoomsPage}
            totalPages={suggestedRoomsQuery.data?.totalPages}
          />
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold uppercase">Trending Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {isLoadingTrending ? (
            <LoadingSpinner className="col-span-full" />
          ) : trendingRooms.length === 0 ? (
            <p>No trending rooms available.</p>
          ) : (
            trendingRooms.map((room, index) => (
              <RoomItem
                key={index}
                room={room}
                handleJoinRoom={() => handleJoinRoom(room.code_invite)}
              />
            ))
          )}
        </div>
        {trendingRooms.length > 0 && (
          <PaginationCustom
            onPageChange={(page) => setTrendingRoomsPage(page)}
            currentPage={trendingRoomsPage}
            totalPages={trendingRoomsQuery.data?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(RoomsContainer);
