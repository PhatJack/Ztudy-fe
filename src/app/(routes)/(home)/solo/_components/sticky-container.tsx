"use client";
import { useSoloContext } from "@/hooks/useSoloContext";
import React from "react";
import Pomodoro from "./pomodoro";
import SessionGoal from "./session-goal";
import StudyStat from "./study-stat";
import BackgroundList from "./background-list";
import Quote from "./quote";
import SoundList from "./sound-list";

const StickyContainer = () => {
  const [state,] = useSoloContext();

  return (
    <>
      <div className="absolute top-0 left-0 flex flex-col gap-6 min-w-64">
        {state.isOpenPomodoro ? <Pomodoro /> : null}
        {state.isOpenSessionGoal ? <SessionGoal /> : null}
      </div>
      <div className="absolute top-0 right-0 flex flex-col min-w-64">
        {state.activePanel === "quote" ? <Quote /> : null}
        {state.activePanel === "sound" ? <SoundList /> : null}
        {state.activePanel === "studyStats" ? <StudyStat /> : null}
        {state.activePanel === "backgroundIframe" ? <BackgroundList /> : null}
      </div>
    </>
  );
};

export default React.memo(StickyContainer);
