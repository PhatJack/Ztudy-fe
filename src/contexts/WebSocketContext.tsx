"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useChatContext } from "@/hooks/useChatContext";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import toast from "react-hot-toast";

// WebSocket context type
interface WebSocketContextProps {
  connectOnlineSocket: () => void;
  connectChatSocket: (roomCode: string) => void;
  disconnectChatSocket: () => void;
  sendTypingStatus: (isTyping: boolean) => void;
  chatSocketRef: React.MutableRefObject<WebSocket | null>;
}

// Create context
const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: React.ReactNode;
}

// WebSocket provider component
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [stateAuth] = useAuthContext();
  const {
    setMessages,
    setParticipants,
    setCurrentRoom,
    addTypingUser,
    removeTypingUser,
    setPendingRequests,
    setIsAdmin,
    setIsPending,
    pendingRequests,
  } = useChatContext();

  // Use refs for WebSockets to prevent re-renders
  const onlineSocketRef = useRef<WebSocket | null>(null);
  const chatSocketRef = useRef<WebSocket | null>(null);

  // Connect online status socket
  const connectOnlineSocket = useCallback(() => {
    if (!onlineSocketRef.current) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/online/`
      );
      onlineSocketRef.current = ws;

      ws.onopen = () => {
        console.log("Online WebSocket Connected");
      };

      ws.onclose = () => {
        console.log("Online WebSocket Disconnected");
        onlineSocketRef.current = null;
      };

      ws.onerror = (error) => {
        console.error("Online WebSocket Error:", error);
        onlineSocketRef.current = null;
      };
    }
  }, []);

  // Handle message
  const handleMessage = useCallback(
    (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case "chat_message":
          setMessages((prev) => [
            ...prev,
            {
              content: data.message,
              user: data.user,
              timestamp: new Date().toISOString(),
            },
          ]);
          // Remove typing status for the message sender
          if (data?.user?.id) {
            removeTypingUser(data.user.id);
          }
          break;

        case "user_joined":
          // Play door bell sound when user joins
          const audio = new Audio("/door-bell.mp3");
          audio
            .play()
            .catch((error) => console.log("Error playing sound:", error));
          setParticipants((prev) => {
            if (!prev.find((p) => p?.user?.id === data.user.id)) {
              return [...prev, data.user];
            }
            return prev;
          });
          break;

        case "user_left":
          const isPending = pendingRequests.find(
            (user) => user.user.id == data.user.id
          );
          if (isPending) {
            setPendingRequests((prev) =>
              prev.filter((user) => user.user.id !== data.user.id)
            );
          }
          setParticipants((prev) =>
            prev.filter((user) => user.user.id !== data.user.id)
          );
          break;

        case "typing_status":
          if (data.user.id != stateAuth.user?.id) {
            if (data.is_typing) {
              addTypingUser(data.user.id);
              // Automatically remove typing status after 3 seconds
              setTimeout(() => {
                removeTypingUser(data.user.id);
              }, 3000);
            } else {
              removeTypingUser(data.user.id);
            }
          }
          break;

        case "error":
          if (chatSocketRef.current) {
            chatSocketRef.current.close();
            chatSocketRef.current = null;
          }
          break;

        case "pending_requests":
          setPendingRequests(data.requests);
          break;

        case "user_approved":
          setIsPending(false);
          break;

        case "user_rejected":
          setCurrentRoom(null);
          if (chatSocketRef.current) {
            chatSocketRef.current.close();
            chatSocketRef.current = null;
          }
          toast.error("Your request was rejected by the admin.");
          break;

        case "participant_list":
          setParticipants(data.participants);
          break;

        case "user_assigned_admin":
          setIsAdmin(true);
          break;

        default:
          break;
      }
    },
    [
      chatSocketRef.current,
      stateAuth.user?.id,
      addTypingUser,
      removeTypingUser,
      setMessages,
      setParticipants,
      setCurrentRoom,
      setPendingRequests,
      setIsAdmin,
      setIsPending,
      pendingRequests,
    ]
  );

  // Handle Error
  const handleError = useCallback((error: any) => {
    console.error("Chat WebSocket Error:", error);
    chatSocketRef.current = null;
  }, []);

  // Connect chat WebSocket using ref
  const connectChatSocket = useCallback(
    (roomCode: string) => {
      if (!roomCode) return;
      if (
        chatSocketRef.current &&
        chatSocketRef.current.readyState === WebSocket.OPEN
      ) {
        return;
      }

      if (
        chatSocketRef.current &&
        chatSocketRef.current.readyState !== WebSocket.CLOSED
      ) {
        chatSocketRef.current.onopen = null;
        chatSocketRef.current.onmessage = null;
        chatSocketRef.current.onerror = null;
        chatSocketRef.current.onclose = null;
        chatSocketRef.current.close();
        chatSocketRef.current = null;
      }
      chatSocketRef.current = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat/${roomCode}/`
      );

      chatSocketRef.current.onopen = () => {
        console.log("Chat WebSocket Connected");
      };
      // Handle close event
      chatSocketRef.current.onclose = () => {
        console.log("Chat WebSocket Disconnected");
        chatSocketRef.current = null;
      };

      chatSocketRef.current.onmessage = handleMessage;

      chatSocketRef.current.onerror = handleError;
    },
    [handleMessage, handleError]
  );

  // Disconnect chat WebSocket
  const disconnectChatSocket = useCallback(() => {
    if (chatSocketRef.current) {
      chatSocketRef.current.close();
      chatSocketRef.current = null;
    }
  }, []);

  // Send typing status - memoized to prevent recreation on renders
  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (chatSocketRef.current?.readyState === WebSocket.OPEN) {
      chatSocketRef.current.send(
        JSON.stringify({ type: "typing", is_typing: isTyping })
      );
    }
  }, []);

  // Cleanup WebSockets on unmount
  useEffect(() => {
    return () => {
      if (onlineSocketRef.current) {
        onlineSocketRef.current.close();
        onlineSocketRef.current = null;
      }

      if (chatSocketRef.current) {
        chatSocketRef.current.close();
        chatSocketRef.current = null;
      }
    };
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      connectOnlineSocket,
      connectChatSocket,
      disconnectChatSocket,
      sendTypingStatus,
      chatSocketRef,
    }),
    [
      connectOnlineSocket,
      connectChatSocket,
      disconnectChatSocket,
      sendTypingStatus,
      chatSocketRef,
    ]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocketContext
export const useRoomWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useRoomWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
