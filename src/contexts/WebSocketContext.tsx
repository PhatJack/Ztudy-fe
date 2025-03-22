"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useChatContext } from "@/hooks/useChatContext";
import { UserSchema } from "@/lib/schemas/user/user.schema";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import toast from "react-hot-toast";

// Define WebSocket state type
interface WebSocketState {
  onlineSocket: WebSocket | null;
  chatSocket: WebSocket | null;
}

// Define possible actions
type WebSocketAction =
  | { type: "SET_ONLINE_SOCKET"; payload: WebSocket | null }
  | { type: "SET_CHAT_SOCKET"; payload: WebSocket | null };

// Initial state
const initialState: WebSocketState = {
  onlineSocket: null,
  chatSocket: null,
};

// WebSocket reducer function
function webSocketReducer(
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState {
  switch (action.type) {
    case "SET_ONLINE_SOCKET":
      return { ...state, onlineSocket: action.payload };
    case "SET_CHAT_SOCKET":
      return { ...state, chatSocket: action.payload };
    default:
      return state;
  }
}

// WebSocket context type
interface WebSocketContextProps {
  state: WebSocketState;
  dispatch: React.Dispatch<WebSocketAction>;
  connectOnlineSocket: () => void;
  connectChatSocket: (roomCode: string) => void;
  disconnectChatSocket: () => void;
  sendTypingStatus: (isTyping: boolean) => void;
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
  const [stateAuth, dispatchAuth] = useAuthContext();
  const [stateChat, dispatchChat] = useChatContext();
  const [state, dispatch] = useReducer(webSocketReducer, initialState);

  // Connect online status socket
  const connectOnlineSocket = () => {
    if (!state.onlineSocket) {
      const ws = new WebSocket("ws://localhost:8000/ws/online/");

      ws.onopen = () => console.log("Online WebSocket Connected");
      ws.onclose = () => dispatch({ type: "SET_ONLINE_SOCKET", payload: null });
      ws.onerror = (error) => {
        console.error("Online WebSocket Error:", error);
        dispatch({ type: "SET_ONLINE_SOCKET", payload: null });
      };

      dispatch({ type: "SET_ONLINE_SOCKET", payload: ws });
    }
  };

  // Connect chat WebSocket
  const connectChatSocket = (roomCode: string) => {
    if (!roomCode) return;
    if (state.chatSocket) state.chatSocket.close();

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat/${roomCode}/`
    );

    ws.onopen = () => {
      console.log("Chat WebSocket Connected");
      dispatchChat({ type: "SET_IS_CONNECTED", payload: true });
    };
    ws.onclose = () => {
      dispatch({ type: "SET_CHAT_SOCKET", payload: null });
      dispatchChat({ type: "SET_IS_CONNECTED", payload: false });
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Chat WebSocket Message:", data);
      switch (data.type) {
        case "chat_message":
          const newMessage = {
            content: data.message,
            user: data.user as UserSchema,
            timestamp: new Date().toISOString(),
          };
          dispatchChat({ type: "ADD_MESSAGE", payload: newMessage });
          break;
        case "user_joined":
          const newParticipant = stateChat.participants.find(
            (p) => p.id === data.user.id
          );
          if (!newParticipant) {
            dispatchChat({
              type: "SET_PARTICIPANTS",
              payload: [...stateChat.participants, data.user],
            });
          }
          break;
        case "user_left":
          const updatedParticipants = stateChat.participants.filter(
            (p) => p.id !== data.user.id
          );
          dispatchChat({
            type: "SET_PARTICIPANTS",
            payload: updatedParticipants,
          });
          break;
        case "typing_status":
          console.log("Typing status received:", data);
          if (data.user.id === stateAuth.user?.id) return;
          if (data.is_typing) {
            dispatchChat({ type: "ADD_TYPING_USER", payload: data.user.id });
            setTimeout(() => {
              dispatchChat({
                type: "REMOVE_TYPING_USER",
                payload: data.user.id,
              });
            }, 2000);
          } else {
            dispatchChat({
              type: "REMOVE_TYPING_USER",
              payload: data.user.id,
            });
          }
          break;
        case "error":
          console.error("Chat WebSocket Error:", data);
          dispatchChat({ type: "SET_IS_CONNECTED", payload: false });
          ws.close();
          dispatch({ type: "SET_CHAT_SOCKET", payload: null });
          break;
        case "pending_requests":
          console.log("Received pending requests:", data.requests);
          dispatchChat({
            type: "SET_PENDING_REQUESTS",
            payload: data.requests,
          });
          dispatchChat({ type: "SET_IS_CONNECTED", payload: true });
          break;
        case "user_approved":
          console.log("User approved:", data);
          dispatchChat({ type: "SET_IS_CONNECTED", payload: true });
          dispatchChat({ type: "SET_IS_PENDING", payload: false });
          break;
        case "user_rejected":
          console.log("User rejected:", data);
          dispatchChat({ type: "SET_CURRENT_ROOM", payload: null });
          dispatchChat({ type: "SET_IS_CONNECTED", payload: false });
          ws.close();
          toast.error("Your request was rejected by the admin.");
          break;
        case "participant_list":
          console.log("Received participants:", data.participants);
          dispatchChat({
            type: "SET_PARTICIPANTS",
            payload: data.participants,
          });
          break;
        case "user_assigned_admin":
          console.log("User assigned as admin:", data);
          dispatchChat({ type: "SET_IS_ADMIN", payload: true });
          break;
        default:
          console.log("Unhandled message type:", data.type);
          break;
      }
    };
    ws.onerror = (error) => {
      console.error("Chat WebSocket Error:", error);
      dispatch({ type: "SET_CHAT_SOCKET", payload: null });
      dispatchChat({ type: "SET_IS_CONNECTED", payload: false });
    };

    dispatch({ type: "SET_CHAT_SOCKET", payload: ws });
  };

  // Disconnect chat WebSocket
  const disconnectChatSocket = () => {
    if (state.chatSocket) {
      state.chatSocket.close();
      dispatch({ type: "SET_CHAT_SOCKET", payload: null });
    }
  };

  // Send typing status
  const sendTypingStatus = (isTyping: boolean) => {
    if (state.chatSocket?.readyState === WebSocket.OPEN) {
      state.chatSocket.send(
        JSON.stringify({ type: "typing_status", is_typing: isTyping })
      );
    }
  };

  // Cleanup WebSockets on unmount
  useEffect(() => {
    return () => {
      state.onlineSocket?.close();
      state.chatSocket?.close();
    };
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      connectOnlineSocket,
      connectChatSocket,
      disconnectChatSocket,
      sendTypingStatus,
    }),
    [state]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocketContext
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
