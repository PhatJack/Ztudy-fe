"use client";
import TabChat from "@/components/rooms/tabs/tab-chat";
import TabPeople from "@/components/rooms/tabs/tab-people";
import TabRequests from "@/components/rooms/tabs/tab-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/constants/room-tabs";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useChatContext } from "@/hooks/useChatContext";
import { joinRoomApi } from "@/service/(rooms)/room/join-room.api";
import LoadingSpinner from "@/components/loading/loading-spinner";
import MainScreen from "./MainScreen";
import dynamic from "next/dynamic";

interface Props {
  roomCode: string;
}

const PendingScreenDynamic = dynamic(
  () => import("./PendingScreen").then((mod) => mod.default),
  { ssr: false }
);

const RoomDetail = ({ roomCode }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const {
    isPending,
    pendingRequests,
    participants,
    setIsPending,
    messages,
    typingUsers,
    setMessages,
    currentRoom,
    isAdmin,
    setIsAdmin,
    setCurrentRoom,
    isModerator,
  } = useChatContext();
  const { connectChatSocket, disconnectChatSocket } = useRoomWebSocket();

  const handleCancelRequest = () => {
    disconnectChatSocket();
    setIsPending(false);
    router.push("/room");
  };

  useEffect(() => {
    connectChatSocket(roomCode);
    return () => {
      setMessages([]);
      disconnectChatSocket();
    };
  }, []);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const res = await joinRoomApi(roomCode);
        if (res.status === 202) {
          setIsPending(true);
        }
        setLoading(false);
        setCurrentRoom(res.data.room);
        setIsAdmin(res.data.participant.role === "ADMIN");
      } catch (error) {
        toast.error("Failed to join room.");
        router.push("/room");
      } finally {
        setLoading(false);
      }
    };

    if (!currentRoom) {
      joinRoom();
    } else {
      setLoading(false);
    }
  }, [roomCode]);

  // Filter tabs based on room type and admin status
  const filteredTabs = useMemo(() => {
    if (!currentRoom) return tabs;
    return tabs.filter((tab) => {
      if (tab.value === "requestToJoin") {
        return currentRoom.type === "PRIVATE" && (isAdmin || isModerator);
      }
      return true;
    });
  }, [currentRoom, isAdmin, isModerator]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (isPending) {
    return (
      <PendingScreenDynamic
        handleCancelRequest={() => handleCancelRequest()}
        roomCode={roomCode}
      />
    );
  }

  return (
    <div className="size-full flex xl:flex-row flex-col gap-6 xl:h-[calc(100vh-3rem)] overflow-hidden">
      <div className="xl:w-[75%] flex flex-col gap-6">
        <MainScreen roomCode={roomCode} />
      </div>
      <div className="xl:w-[25%] bg-white dark:bg-background h-full rounded-lg flex flex-col gap-4 overflow-hidden">
        <Tabs
          className="xl:h-full h-[500px] relative overflow-hidden flex flex-col"
          defaultValue="roomChat"
        >
          <TabsList className="w-full flex-wrap px-4 py-3 h-fit bg-white dark:bg-background rounded-b-none sticky top-0 border-b dark:border-border shadow-md gap-2">
            {filteredTabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                className="flex-1 basis-[125px] py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted dark:hover:bg-muted font-bold gap-1 dark:text-foreground dark:data-[state=active]:text-primary-foreground"
                value={tab.value}
              >
                <span>
                  <tab.icon size={20} />
                </span>
                <span>{tab.name}</span>
                {tab.value === "requestToJoin" &&
                  isAdmin &&
                  currentRoom?.type === "PRIVATE" &&
                  pendingRequests.length > 0 && (
                    <span className="size-6 bg-secondary dark:bg-secondary/80 flex justify-center items-center rounded-full text-sm font-medium">{`${pendingRequests.length}`}</span>
                  )}
                {tab.value === "people" && participants.length > 0 && (
                  <span className="size-6 bg-secondary dark:bg-secondary/80 flex justify-center items-center rounded-full text-sm font-medium">{`${participants.length}`}</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentRoom?.type === "PRIVATE" && (isAdmin || isModerator) && (
            <TabsContent
              className="mt-0 bg-white dark:bg-background"
              value="requestToJoin"
            >
              <TabRequests requests={pendingRequests} roomCode={roomCode} />
            </TabsContent>
          )}
          <TabsContent
            className="mt-0 h-full overflow-hidden bg-white dark:bg-background"
            value="roomChat"
          >
            <TabChat messages={messages} typingUsers={typingUsers} />
          </TabsContent>
          <TabsContent
            className="mt-0 bg-white dark:bg-background"
            value="people"
          >
            <TabPeople participants={participants} roomCode={roomCode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomDetail;
