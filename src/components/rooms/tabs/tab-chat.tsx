"use client";
import TypingIndicator from "@/components/indicator/typing-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/contexts/ChatContext";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";

interface Props {
  messages: Message[];
  typingUsers: Set<number>;
}

const TabChat = ({ messages, typingUsers }: Props) => {
  const { chatSocketRef, sendTypingStatus } = useRoomWebSocket();
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [state, dispatch] = useAuthContext();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Debounced typing indicator (to prevent excessive WebSocket calls)
  const debouncedTypingStatus = useCallback(
    debounce((status: boolean) => sendTypingStatus(status), 300),
    []
  );

  const handleInputChange = (value: string) => {
    setMessage(value);
    debouncedTypingStatus(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || !chatSocketRef.current) return;

    chatSocketRef.current.send(
      JSON.stringify({
        type: "message",
        message: trimmedMessage,
      })
    );
    setMessage("");
    debouncedTypingStatus.cancel(); // Cancel typing indicator when message is sent
    sendTypingStatus(false);
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      {/* Scrollable messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-4"
      >
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{message.user.username}</span>
              <span className="text-xs text-muted-foreground">
                {format(message.timestamp, "p")}
              </span>
            </div>
            <div className="w-full bg-muted p-3 rounded-md">
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky input area */}
      <div className="sticky bottom-0 xl:static border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-primary text-white"
            disabled={!message.trim()}
          >
            <ChevronRight />
          </Button>
        </form>
      </div>

      {/* Show typing indicator only if others are typing */}
      {state.user &&
        typingUsers.size > 0 &&
        !typingUsers.has(state.user.id) && (
          <div className="absolute bottom-16 left-0 right-0 px-4 py-2 bg-gradient-to-t from-emerald-100 to-transparent">
            <TypingIndicator />
          </div>
        )}
    </div>
  );
};

export default React.memo(TabChat);
