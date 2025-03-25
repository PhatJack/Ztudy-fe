import LoadingSpinner from "@/components/loading/loading-spinner";
import CameraDisplay from "@/components/rooms/camera/CameraDisplay";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";

interface PendingScreenProps {
  cameraEnabled: boolean;
  micEnabled: boolean;
  setCameraEnabled: (enabled: boolean) => void;
  setMicEnabled: (enabled: boolean) => void;
  disconnectChatSocket: () => void;
  dispatchChat: (action: any) => void;
  router: ReturnType<typeof useRouter>;
}
const PendingScreen = ({
  cameraEnabled,
  micEnabled,
  setCameraEnabled,
  setMicEnabled,
  disconnectChatSocket,
  dispatchChat,
  router,
}: PendingScreenProps) => {
  return (
    <div className="size-full flex xl:flex-row flex-col gap-4 xl:h-[calc(100vh-3rem)] overflow-hidden ">
      <div className="p-6 w-full bg-white rounded-lg flex justify-center items-center space-x-6">
        <div className="w-full flex flex-col space-y-6 justify-center items-center">
          <CameraDisplay
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
          />
          <div className="flex space-x-6 flex-wrap">
            <TooltipTemplate content="Camera">
              <Button
                type="button"
                size={"icon"}
                className="rounded-full w-14 h-14 [&_svg]:size-6"
                variant={cameraEnabled ? "default" : "outline"}
                onClick={() => setCameraEnabled(!cameraEnabled)}
              >
                {cameraEnabled ? <Camera /> : <CameraOff />}
              </Button>
            </TooltipTemplate>
            <TooltipTemplate content="Mutes">
              <Button
                type="button"
                size={"icon"}
                className="rounded-full w-14 h-14 [&_svg]:size-6"
                variant={micEnabled ? "default" : "outline"}
                onClick={() => setMicEnabled(!micEnabled)}
              >
                {micEnabled ? <Mic /> : <MicOff />}
              </Button>
            </TooltipTemplate>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-6 justify-center items-center">
          <LoadingSpinner size={50} className="text-primary" />
          <h2 className="text-2xl font-bold">Waiting for Approval</h2>
          <p>
            Your request to join this room is pending approval from an admin.
          </p>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              disconnectChatSocket();
              dispatchChat({ type: "SET_IS_PENDING", payload: false });
              toast.success("Request cancelled");
              router.push("/room");
            }}
          >
            Cancel Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingScreen;
