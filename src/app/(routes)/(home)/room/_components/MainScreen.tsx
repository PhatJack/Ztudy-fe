"use client";
import React from "react";
import LeaveRoomButton from "./LeaveRoomButton";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  MonitorOff,
  MonitorPlay,
} from "lucide-react";
import RoomHeader from "./RoomHeader";
import { useRoomDetailContext } from "@/contexts/RoomDetailContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Badge } from "@/components/ui/badge";

const MainScreen = ({ roomCode }: { roomCode: string }) => {
  const [state] = useAuthContext();
  const {
    remoteUsers,
    localTracks,
    isScreenSharing,
    toggleAudio,
    toggleScreenShare,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
  } = useRoomDetailContext();

  console.log(remoteUsers);
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-background p-3 rounded-lg">
        <RoomHeader />
      </div>
      <div className="flex-1 p-4 rounded-lg bg-white dark:bg-background grid grid-cols-4 gap-1">
        <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden border-2 border-primary">
          {localTracks[1] && !isScreenSharing && (
            <div
              className="w-full h-full"
              ref={(element) => {
                if (element) {
                  localTracks[1].play(element);
                }
              }}
            ></div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge>{state.user?.username} (You)</Badge>
          </div>
        </div>
        {remoteUsers.length > 0 &&
          remoteUsers.map((user) => (
            <div
              key={user.uid}
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden "
            >
              <div
                className="w-full h-full"
                ref={(element) => {
                  if (element) {
                    user.videoTrack?.play(element);
                  }
                }}
              ></div>
              <div className="absolute bottom-2 left-2">
                <Badge>{state.user?.username} (You)</Badge>
              </div>
            </div>
          ))}
      </div>
      <div className="p-3 rounded-lg bg-white dark:bg-background flex gap-6 justify-center items-center">
        <TooltipTemplate content="Camera">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isVideoEnabled ? "default" : "outline"}
            onClick={() => toggleVideo()}
          >
            {isVideoEnabled ? <Camera /> : <CameraOff />}
          </Button>
        </TooltipTemplate>
        <TooltipTemplate content="Mute">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isAudioEnabled ? "default" : "outline"}
            onClick={() => toggleAudio()}
          >
            {isAudioEnabled ? <Mic /> : <MicOff />}
          </Button>
        </TooltipTemplate>
        <LeaveRoomButton roomCode={roomCode} />
        <TooltipTemplate content="Presentation">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isScreenSharing ? "default" : "outline"}
            onClick={() => toggleScreenShare()}
          >
            {isScreenSharing ? <MonitorPlay /> : <MonitorOff />}
          </Button>
        </TooltipTemplate>
      </div>
      {/* <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} roomCode={roomCode} /> */}
    </div>
  );
};

export default MainScreen;
