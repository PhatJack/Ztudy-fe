"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";

// WebSocket context type
interface OnlineWebSocketContextProps {
  connectOnlineSocket: () => void;
  disconnectOnlineSocket: () => void;
  onlineCount: number;
  setOnlineCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create context
const OnlineWebSocketContext = createContext<
  OnlineWebSocketContextProps | undefined
>(undefined);

interface OnlineWebSocketProviderProps {
  children: React.ReactNode;
}

// WebSocket provider component
export const OnlineWebSocketProvider: React.FC<
  OnlineWebSocketProviderProps
> = ({ children }) => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const onlineSocketRef = useRef<WebSocket | null>(null);

  const handleMessage = useCallback(
    (event: any) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "online_count":
          setOnlineCount(data.online_count);
          break;
        case "send_achievement":
          // Dispatch a custom event to notify about the achievement
          const achievementEvent = new CustomEvent("achievement-notification", {
            detail: {
              level: data.level,
              message:
                data.message ||
                `Congratulations! You've reached level ${data.level}!`,
            },
          });
          window.dispatchEvent(achievementEvent);
          break;
        default:
          break;
      }
    },
    [setOnlineCount]
  );

  // Connect online status socket
  const connectOnlineSocket = useCallback(() => {
    if (!onlineSocketRef.current) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/online/`
      );
      onlineSocketRef.current = ws;

      ws.onopen = () => {};

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        onlineSocketRef.current = null;
      };

      ws.onerror = (error) => {
        onlineSocketRef.current = null;
      };
    }
  }, [handleMessage]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (onlineSocketRef.current) {
        onlineSocketRef.current.close();
        onlineSocketRef.current = null;
      }
    };
  }, []);

  const disconnectOnlineSocket = useCallback(() => {
    if (onlineSocketRef.current) {
      onlineSocketRef.current.close();
      onlineSocketRef.current = null;
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      connectOnlineSocket,
      disconnectOnlineSocket,
      onlineCount,
      setOnlineCount,
    }),
    [connectOnlineSocket, disconnectOnlineSocket, onlineCount, setOnlineCount]
  );

  return (
    <OnlineWebSocketContext.Provider value={value}>
      {children}
    </OnlineWebSocketContext.Provider>
  );
};

// Custom hook to use OnlineWebSocketContext
export const useOnlineWebSocket = () => {
  const context = useContext(OnlineWebSocketContext);
  if (!context) {
    throw new Error(
      "useOnlineWebSocket must be used within an OnlineWebSocketProvider"
    );
  }
  return context;
};
