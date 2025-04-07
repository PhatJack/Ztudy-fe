"use client";
import { useSoloContext } from "@/hooks/useSoloContext";
import React from "react";
import Pomodoro from "./pomodoro";
import BackgroundList from "./background-list";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";

const QuoteDynamic = dynamic(() => import("./quote"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});
const SoundListDynamic = dynamic(() => import("./sound-list"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});
const SessionGoalDynamic = dynamic(() => import("./session-goal"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});
const StudyStatDynamic = dynamic(() => import("./study-stat"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});
const BackgroundListDynamic = dynamic(() => import("./background-list"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});
const PomodoroDynamic = dynamic(() => import("./pomodoro"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-[267px]" />,
});

const StickyContainer = () => {
  const { onlineCount } = useOnlineWebSocket();
  const [state] = useSoloContext();

  return (
    <>
      <div className="absolute top-0 left-0 flex flex-col gap-6 min-w-64">
        {state.isOpenPomodoro ? <PomodoroDynamic /> : null}
        {state.isOpenSessionGoal ? <SessionGoalDynamic /> : null}
      </div>
      <div className="absolute top-0 right-0 flex flex-col min-w-64">
        {state.activePanel === "quote" ? <QuoteDynamic /> : null}
        {state.activePanel === "sound" ? <SoundListDynamic /> : null}
        {state.activePanel === "studyStats" ? <StudyStatDynamic /> : null}
        {state.activePanel === "backgroundIframe" ? (
          <BackgroundListDynamic />
        ) : null}
      </div>
      <div className="absolute bottom-0 left-0 flex gap-6">
        <div className="flex items-center space-x-1 w-fit px-2 py-1 rounded-full bg-background text-sm">
          <span className="size-2 bg-emerald-400 animate-pulse-custom rounded-full"></span>
          <span>
            <strong>{onlineCount}</strong>
            <span> onlines are solo stuyding</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default React.memo(StickyContainer);
