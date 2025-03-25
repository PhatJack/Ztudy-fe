"use client";
import TabChat from "@/components/rooms/tabs/tab-chat";
import TabPeople from "@/components/rooms/tabs/tab-people";
import TabRequests from "@/components/rooms/tabs/tab-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/constants/room-tabs";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useChatContext } from "@/hooks/useChatContext";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import PendingScreen from "./PendingScreen";

interface Props {
  roomCode: string;
}

const RoomDetail = ({ roomCode }: Props) => {
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const router = useRouter();
  const [stateChat, dispatchChat] = useChatContext();
  const {
    connectChatSocket,
    disconnectChatSocket,
    sendTypingStatus,
    dispatch,
    state,
  } = useRoomWebSocket();

  useEffect(() => {
    connectChatSocket(roomCode);
    return () => {
      disconnectChatSocket();
    };
  }, []);

  if (stateChat.isPending) {
    return (
      <PendingScreen
        cameraEnabled={cameraEnabled}
        micEnabled={micEnabled}
        setCameraEnabled={setCameraEnabled}
        setMicEnabled={setMicEnabled}
        disconnectChatSocket={disconnectChatSocket}
        dispatchChat={dispatchChat}
        router={router}
      />
    );
  }

  return (
    <div className="size-full flex xl:flex-row flex-col gap-4 xl:h-[calc(100vh-3rem)] overflow-hidden">
      <div className="p-4 xl:w-[75%] flex-1 bg-white dark:bg-background rounded-lg"></div>
      <div className="xl:w-[25%] overflow-y-auto bg-white dark:bg-background h-full rounded-lg flex flex-col gap-4 overflow-hidden">
        <Tabs
          className="xl:max-h-full xl:min-h-full min-h-[500px] max-h-[500px] relative overflow-y-auto"
          defaultValue="requestToJoin"
        >
          <TabsList className="w-full flex-wrap px-4 py-3 h-fit bg-white rounded-b-none sticky top-0 border-b shadow-md gap-2">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                className="flex-1 basis-[125px] py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold gap-1"
                value={tab.value}
              >
                <span>
                  <tab.icon size={20} />
                </span>
                <span>{tab.name}</span>
                {tab.value === "requestToJoin" && (
                  <span className="size-6 bg-secondary flex justify-center items-center rounded-full">{`3`}</span>
                )}
                {tab.value === "people" && (
                  <span className="size-6 bg-secondary flex justify-center items-center rounded-full">{`2`}</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent className="mt-0" value="requestToJoin">
            <TabRequests
            // requests={Array.from({ length: 20 })}
            // handleApprove={(id: string) => {}}
            // handleReject={(id: string) => {}}
            />
          </TabsContent>
          <TabsContent className="mt-0" value="roomChat">
            <TabChat />
          </TabsContent>
          <TabsContent className="mt-0" value="people">
            <TabPeople />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomDetail;
