import LoadingSpinner from "@/components/loading/loading-spinner";
import CameraDisplay from "@/components/rooms/camera/CameraDisplay";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { useRoomDetailContext } from "@/contexts/RoomDetailContext";
import { useCancelRequestMutation } from "@/service/(rooms)/request/request.api";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import React from "react";

interface PendingScreenProps {
  handleCancelRequest: () => void;
  roomCode: string;
}
const PendingScreen = ({
  handleCancelRequest,
  roomCode,
}: PendingScreenProps) => {
  
  const leaveRoomMutation = useCancelRequestMutation();

  const onClick = () => {
    leaveRoomMutation.mutate(roomCode, {
      onSuccess: () => {
        handleCancelRequest();
      },
    });
  };

  return (
    <div className="size-full flex xl:flex-row flex-col gap-4 xl:h-[calc(100vh-3rem)] overflow-hidden ">
      <div className="p-6 w-full bg-white rounded-lg flex justify-center items-center space-x-6">
        <div className="w-full flex flex-col space-y-6 justify-center items-center">
          {/* <CameraDisplay
            cameraEnabled={isVideoEnabled}
            micEnabled={isAudioEnabled}
          />
          <div className="flex space-x-6 flex-wrap">
            <TooltipTemplate content="Camera">
              <Button
                type="button"
                size={"icon"}
                className="rounded-full w-14 h-14 [&_svg]:size-6"
                variant={isVideoEnabled ? "default" : "outline"}
                onClick={() => toggleVideo()}
              >
                {isVideoEnabled ? <Camera /> : <CameraOff />}
              </Button>
            </TooltipTemplate>
            <TooltipTemplate content="Mutes">
              <Button
                type="button"
                size={"icon"}
                className="rounded-full w-14 h-14 [&_svg]:size-6"
                variant={isAudioEnabled ? "default" : "outline"}
                onClick={() => toggleAudio()}
              >
                {isAudioEnabled ? <Mic /> : <MicOff />}
              </Button>
            </TooltipTemplate>
          </div> */}
        </div>
        <div className="w-full flex flex-col space-y-6 justify-center items-center">
          <LoadingSpinner size={50} className="text-primary" />
          <h2 className="text-2xl font-bold">waiting for approval</h2>
          <p>
            Your request to join this room is pending approval from an admin.
          </p>
          <Button type="button" variant={"destructive"} onClick={onClick}>
            Cancel Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PendingScreen);
