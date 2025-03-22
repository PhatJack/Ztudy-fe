"use client";
import {
  ChatAction,
  ChatContext,
  InitialChatState,
} from "@/contexts/ChatContext";
import { Dispatch, useContext } from "react";

// Define the return type explicitly to match SoloContextType
export const useChatContext = (): [InitialChatState, Dispatch<ChatAction>] => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return [context.state, context.dispatch];
};
