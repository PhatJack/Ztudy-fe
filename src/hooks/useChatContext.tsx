"use client"
import { ChatContext } from "@/contexts/ChatContext";
import { useContext } from "react";

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};