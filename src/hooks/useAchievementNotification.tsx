"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";
import { MonthlyLevelSchema } from "@/lib/schemas/monthly-level.schema";

export function useAchievementNotification() {
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementLevel, setAchievementLevel] =
    useState<MonthlyLevelSchema>("ENTRY");
  const [achievementMessage, setAchievementMessage] = useState("");

  const { connectOnlineSocket } = useOnlineWebSocket();

  useEffect(() => {
    // Connect to the online WebSocket to receive achievement notifications
    connectOnlineSocket();

    // Listen for the "send_achievement" event from the WebSocketContext
    const handleAchievementEvent = (event: CustomEvent) => {
      const { level, message } = event.detail;
      setAchievementLevel(level);
      setAchievementMessage(message || `You've reached new level ${level}!`);
      setShowAchievement(true);
    };

    // Add a custom event listener for achievement notifications
    window.addEventListener(
      "achievement-notification",
      handleAchievementEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        "achievement-notification",
        handleAchievementEvent as EventListener
      );
    };
  }, [connectOnlineSocket]);

  const closeAchievementPopup = useCallback(() => {
    setShowAchievement(false);
  }, []);

  return {
    showAchievement,
    achievementLevel,
    achievementMessage,
    closeAchievementPopup,
  };
}
