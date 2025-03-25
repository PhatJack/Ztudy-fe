"use client";
import { RoomSchema, RoomWithCategorySchema } from "@/lib/schemas/room/room.schema";
import { UserSchema } from "@/lib/schemas/user/user.schema";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useMemo,
} from "react";

// Define types based on your existing structure
type Message = {
  content: string;
  user: UserSchema;
  timestamp: string;
  // Add other message properties as needed
};

type Participant = {
  id: string;
  name: string;
  // Add other participant properties as needed
};

type PendingRequest = {
  id: string;
  userId: string;
  userName: string;
  // Add other request properties as needed
};

// Define the state structure
export interface InitialChatState {
  messages: Message[];
  participants: Participant[];
  isConnected: boolean;
  currentRoom: RoomWithCategorySchema | null;
  typingUsers: Set<string>;
  pendingRequests: PendingRequest[];
  isAdmin: boolean;
  isPending: boolean;
}

// Define action types
export type ChatAction =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_PARTICIPANTS"; payload: Participant[] }
  | { type: "SET_IS_CONNECTED"; payload: boolean }
  | { type: "SET_CURRENT_ROOM"; payload: null | RoomWithCategorySchema }
  | { type: "SET_TYPING_USERS"; payload: Set<string> }
  | { type: "ADD_TYPING_USER"; payload: string }
  | { type: "REMOVE_TYPING_USER"; payload: string }
  | { type: "SET_PENDING_REQUESTS"; payload: PendingRequest[] }
  | { type: "SET_IS_ADMIN"; payload: boolean }
  | { type: "SET_IS_PENDING"; payload: boolean };

// Create the initial state
const initialState: InitialChatState = {
  messages: [],
  participants: [],
  isConnected: false,
  currentRoom: null,
  typingUsers: new Set<string>(),
  pendingRequests: [],
  isAdmin: false,
  isPending: false,
};

function chatReducer(
  state: InitialChatState,
  action: ChatAction
): InitialChatState {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_IS_CONNECTED":
      return { ...state, isConnected: action.payload };
    case "SET_CURRENT_ROOM":
      return { ...state, currentRoom: action.payload };
    case "SET_TYPING_USERS":
      return { ...state, typingUsers: action.payload };
    case "ADD_TYPING_USER": {
      const newTypingUsers = new Set(state.typingUsers);
      newTypingUsers.add(action.payload);
      return { ...state, typingUsers: newTypingUsers };
    }
    case "REMOVE_TYPING_USER": {
      const newTypingUsers = new Set(state.typingUsers);
      newTypingUsers.delete(action.payload);
      return { ...state, typingUsers: newTypingUsers };
    }
    case "SET_PENDING_REQUESTS":
      return { ...state, pendingRequests: action.payload };
    case "SET_IS_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "SET_IS_PENDING":
      return { ...state, isPending: action.payload };
    default:
      return state;
  }
}

// Create the context with initial values
interface ChatContextType {
  state: InitialChatState;
  dispatch: Dispatch<ChatAction>;
}

export const ChatContext = createContext<ChatContextType>({
  state: initialState,
  dispatch: () => null,
});

// Create the provider component
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
