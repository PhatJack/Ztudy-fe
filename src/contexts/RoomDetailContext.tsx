import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  ILocalVideoTrack,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack
} from "agora-rtc-react";
import { getAgoraTokenApi } from "@/service/(rooms)/agora/get-token-agora.api";

interface ExtendedRemoteUser extends IAgoraRTCRemoteUser {
  username?: string;
}
interface RoomDetailContextType {
  // State
  localTracks: (IMicrophoneAudioTrack | ICameraVideoTrack)[];
  remoteUsers: ExtendedRemoteUser[];
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  screenTrack: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack] | null;
  isLoading: boolean;

  // Actions
  toggleVideo: () => Promise<void>;
  toggleAudio: () => Promise<void>;
  toggleScreenShare: () => Promise<void>;
  leaveChannel: () => Promise<void>;
  joinChannel: ({
    code_invitation,
    initialAudioEnabled,
    initialVideoEnabled,
  }: {
    code_invitation: string;
    initialAudioEnabled: boolean;
    initialVideoEnabled: boolean;
  }) => Promise<void>;
}

// Create the context with a default undefined value
const RoomDetailContext = createContext<RoomDetailContextType | undefined>(
  undefined
);

// Initialize Agora client
const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

interface RoomDetailProviderProps {
  children: ReactNode;
}

export const RoomDetailProvider = ({ children }: RoomDetailProviderProps) => {
  const [localTracks, setLocalTracks] = useState<
    (IMicrophoneAudioTrack | ICameraVideoTrack)[]
  >([]);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenTrack, setScreenTrack] = useState<
    ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const cleanup = async () => {
    try {
      // Close local tracks
      for (const track of localTracks) {
        track.close();
      }
      setLocalTracks([]);

      // Close screen sharing track
      if (screenTrack) {
        await client.unpublish(screenTrack);
        if (Array.isArray(screenTrack)) {
          screenTrack.forEach((track) => track.close());
        } else {
          screenTrack.close();
        }
        setScreenTrack(null);
      }

      // Leave the channel if connected
      if (client.connectionState === "CONNECTED") {
        await client.leave();
      }

      // Remove all event listeners
      client.removeAllListeners();
      setRemoteUsers([]);
    } catch (err) {
      console.error("Error during cleanup:", err);
    }
  };

  const toggleVideo = async () => {
    if (localTracks[1]) {
      await localTracks[1].setEnabled(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = async () => {
    if (localTracks[0]) {
      await localTracks[0].setEnabled(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Create screen sharing track
        const screenShareTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: {
            width: 1920,
            height: 1080,
            frameRate: 30,
            bitrateMin: 600,
            bitrateMax: 2000,
          },
        });

        // Publish screen track
        await client.publish(screenShareTrack);
        setScreenTrack(screenShareTrack);
        setIsScreenSharing(true);

        // Handle screen share stop
        if (!Array.isArray(screenShareTrack)) {
          screenShareTrack.on("track-ended", async () => {
            await client.unpublish(screenShareTrack);
            screenShareTrack.close();
            setScreenTrack(null);
            setIsScreenSharing(false);
          });
        }
      } else if (screenTrack) {
        // Stop screen sharing
        await client.unpublish(screenTrack);
        if (Array.isArray(screenTrack)) {
          screenTrack.forEach((track) => track.close());
        } else {
          screenTrack.close();
        }
        setScreenTrack(null);
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  const leaveChannel = async () => {
    await cleanup();
  };

  const joinChannel = async ({
    code_invitation,
    initialAudioEnabled,
    initialVideoEnabled,
  }: {
    code_invitation: string;
    initialAudioEnabled: boolean;
    initialVideoEnabled: boolean;
  }) => {
    try {
      if (!code_invitation) {
        return;
      }
      await cleanup();

      setIsLoading(true);

      const response = await getAgoraTokenApi({ channel: code_invitation });
      if (response.status !== 200) {
        throw new Error(
          `Server returned invalid response: ${response.status} ${response.statusText}`
        );
      }

      const data: any = response.data;

      // Join the channel
      console.log("Joining channel:", {
        appId: data.app_id,
        channel: code_invitation,
        uid: data.uid,
      });

      await client.join(data.app_id, code_invitation, data.token, data.uid);
      console.log("Successfully joined channel");

      // Setup event handlers
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setRemoteUsers((prevUsers) => {
            if (prevUsers.every((prevUser) => prevUser.uid !== user.uid)) {
              return [...prevUsers, user];
            }
            return prevUsers;
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          setRemoteUsers((prevUsers) =>
            prevUsers.filter((prevUser) => prevUser.uid !== user.uid)
          );
        }
        if (mediaType === "audio") {
          user.audioTrack?.stop();
        }
      });

      // Create local tracks
      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks(
          {
            encoderConfig: "high_quality",
          },
          {
            encoderConfig: {
              width: 640,
              height: 360,
              frameRate: 30,
              bitrateMin: 400,
              bitrateMax: 1000,
            },
          }
        );

      // Set initial states
      if (!initialAudioEnabled) audioTrack.setEnabled(false);
      if (!initialVideoEnabled) videoTrack.setEnabled(false);

      setIsAudioEnabled(initialAudioEnabled);
      setIsVideoEnabled(initialVideoEnabled);
      setLocalTracks([audioTrack, videoTrack]);

      await client.publish([audioTrack, videoTrack]);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error joining channel:", error);
      setIsLoading(false);
      await cleanup();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const value = useMemo(
    () => ({
      localTracks,
      remoteUsers,
      isVideoEnabled,
      isAudioEnabled,
      isScreenSharing,
      screenTrack,
      isLoading,
      toggleVideo,
      toggleAudio,
      toggleScreenShare,
      leaveChannel,
      joinChannel,
    }),
    [
      localTracks,
      remoteUsers,
      isVideoEnabled,
      isAudioEnabled,
      isScreenSharing,
      screenTrack,
      isLoading,
    ]
  );

  return (
    <RoomDetailContext.Provider value={value}>
      {children}
    </RoomDetailContext.Provider>
  );
};

// Custom hook for using this context
export const useRoomDetailContext = () => {
  const context = useContext(RoomDetailContext);
  if (context === undefined) {
    throw new Error("useRoomDetail must be used within a RoomDetailProvider");
  }
  return context;
};
