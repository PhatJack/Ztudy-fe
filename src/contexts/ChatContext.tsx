"use client";
import React, { createContext, useState, ReactNode, useContext, useMemo, useCallback } from "react";
import { RoomWithCategorySchema } from "@/lib/schemas/room/room.schema";
import { UserSchema } from "@/lib/schemas/user/user.schema";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Define types
export type Message = {
  content: string;
  user: UserSchema;
  timestamp: string;
};

export type Participant = {
  is_admin: boolean;
  is_approved: boolean;
  is_out: boolean;
  user: UserSchema;
};

// Define the ChatContext type
interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  currentRoom: RoomWithCategorySchema | null;
  setCurrentRoom: React.Dispatch<React.SetStateAction<RoomWithCategorySchema | null>>;
  typingUsers: Set<string>;
  addTypingUser: (userId: string) => void;
  removeTypingUser: (userId: string) => void;
  pendingRequests: Participant[];
  setPendingRequests: React.Dispatch<React.SetStateAction<Participant[]>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with default values
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Only initialize state if in browser environment
  if (!isBrowser) {
    return <>{children}</>;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentRoom, setCurrentRoom] = useState<RoomWithCategorySchema | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [pendingRequests, setPendingRequests] = useState<Participant[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  // Memoize the add/remove typing user functions to prevent re-renders
  const addTypingUser = useCallback((userId: string) => {
    setTypingUsers(prev => {
      // Only update if the user is not already in the set
      if (!prev.has(userId)) {
        const newSet = new Set(prev);
        newSet.add(userId);
        return newSet;
      }
      return prev;
    });
  }, []);

  const removeTypingUser = useCallback((userId: string) => {
    setTypingUsers(prev => {
      // Only update if the user is in the set
      if (prev.has(userId)) {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      }
      return prev;
    });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<ChatContextType>(() => ({
    messages,
    setMessages,
    participants,
    setParticipants,
    currentRoom,
    setCurrentRoom,
    typingUsers,
    addTypingUser,
    removeTypingUser,
    pendingRequests,
    setPendingRequests,
    isAdmin,
    setIsAdmin,
    isPending,
    setIsPending,
  }), [
    messages, 
    participants, 
    currentRoom, 
    typingUsers, 
    pendingRequests, 
    isAdmin, 
    isPending,
    addTypingUser,
    removeTypingUser
  ]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Create a custom hook to use the ChatContext
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};