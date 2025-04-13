"use client";
import { useSoloContext } from "@/hooks/useSoloContext";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";

const QuoteDynamic = dynamic(() => import("./quote"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});
const SoundListDynamic = dynamic(() => import("./sound-list"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});
const SessionGoalDynamic = dynamic(() => import("./session-goal"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});
const StudyStatDynamic = dynamic(() => import("./study-stat"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});
const BackgroundListDynamic = dynamic(() => import("./background-list"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});
const PomodoroDynamic = dynamic(() => import("./pomodoro"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[280px]" />,
});

const StickyContainer = () => {
  const { onlineCount } = useOnlineWebSocket();
  const [state] = useSoloContext();

  return (
    <>
      {/* Left Panels */}
      <div className="fixed top-0 left-0 right-0 md:absolute md:left-0 md:right-auto flex flex-col gap-6 w-full md:w-72 p-4 md:p-0">
        {state.isOpenPomodoro ? <PomodoroDynamic /> : null}
        {state.isOpenSessionGoal ? <SessionGoalDynamic /> : null}
      </div>

      {/* Right Panels */}
      <div className="fixed top-0 right-0 left-0 md:absolute md:right-0 md:left-auto flex justify-end w-full md:w-72 p-4 md:p-0">
        {state.activePanel === "quote" ? <QuoteDynamic /> : null}
        {state.activePanel === "sound" ? <SoundListDynamic /> : null}
        {state.activePanel === "studyStats" ? <StudyStatDynamic /> : null}
        {state.activePanel === "backgroundIframe" ? (
          <BackgroundListDynamic />
        ) : null}
      </div>

      {/* Online Counter */}
      <div className="fixed bottom-36 md:bottom-0 left-6 md:left-0 md:absolute flex justify-center md:justify-start">
        <div className="flex items-center space-x-1 w-fit px-2 py-1 rounded-full bg-background/95 backdrop-blur-sm text-sm border border-border">
          <span className="size-2 bg-emerald-400 animate-pulse-custom rounded-full"></span>
          <span>
            <strong>{onlineCount}</strong>
            <span> online studying</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default React.memo(StickyContainer);
