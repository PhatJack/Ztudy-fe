"use client";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { menuButton } from "@/constants/solo-button-menu";
import { PanelType } from "@/contexts/SoloContext";
import { usePomodoroContext } from "@/contexts/SoloPomodoroContext";
import { useSoloContext } from "@/hooks/useSoloContext";
import { cn } from "@/lib/utils";
import { Clock, Expand, Minimize, Target } from "lucide-react";
import React, { useCallback } from "react";

const StickyMenu = () => {
  const { formatTime, remainingTime } = usePomodoroContext();
  const { hours, minutes, seconds } = formatTime(remainingTime);
  const [state, dispatch] = useSoloContext();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        dispatch({ type: "TOGGLE_FULL_SCREEN", payload: true });
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        dispatch({ type: "TOGGLE_FULL_SCREEN", payload: false });
      });
    }
  };

  const handleClick = useCallback(
    (variable: PanelType) => {
      dispatch({
        type: "SET_ACTIVE_PANEL",
        payload: variable,
      });
    },
    [dispatch]
  );

  return (
    <div className="fixed w-full bottom-0 left-0 right-0 md:relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-0 bg-background/95 backdrop-blur-sm md:bg-transparent border-t md:border-t-0 border-border z-50">
      {/* Timer and Goals */}
      <div className="flex gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
        {/* Pomodoro */}
        <div
          onClick={() => {
            dispatch({ type: "TOGGLE_BUTTON", payload: "isOpenPomodoro" });
          }}
          className="shadow-lg h-full px-3 md:px-4 py-1 flex flex-col justify-center items-center gap-0.5 bg-background hover:bg-background/90 cursor-pointer text-foreground rounded-md flex-1 md:flex-none"
        >
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <Clock size={14} />
            </div>
            <span className="text-xs font-medium leading-[1.15rem]">
              Pomodoro Timer
            </span>
          </div>
          <p className="text-sm font-bold">
            <span>{hours}</span>
            <span className="mb-1">:</span>
            <span>{minutes}</span>
            <span className="mb-1">:</span>
            <span>{seconds}</span>
          </p>
        </div>

        {/* Study Goal */}
        <div
          onClick={() => {
            dispatch({
              type: "TOGGLE_BUTTON",
              payload: "isOpenSessionGoal",
            });
          }}
          className="shadow-lg h-full px-3 md:px-4 py-1 flex flex-col justify-center items-center gap-0.5 bg-background hover:bg-background/90 cursor-pointer text-foreground rounded-md flex-1 md:flex-none"
        >
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <Target size={14} />
            </div>
            <span className="text-xs font-medium leading-[1.15rem]">
              Session Goals
            </span>
          </div>
          <p className="text-sm">
            <strong>
              {state.completedGoals.length} / {state.totalOpenGoals}
            </strong>
          </p>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="flex gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
        {menuButton.map((item, index) => (
          <TooltipTemplate content={item.label} key={index}>
            <Button
              type="button"
              onClick={() => handleClick(item.variable)}
              className={cn(
                `w-10 h-10 md:w-12 md:h-12 [&_svg]:size-4 md:[&_svg]:size-5 shadow-lg`,
                state.activePanel === item.variable && "bg-primary text-primary-foreground"
              )}
              variant={
                state.activePanel === item.variable ? "default" : "outline"
              }
              size={"icon"}
            >
              <span className="text-lg md:text-xl">
                <item.icon />
              </span>
            </Button>
          </TooltipTemplate>
        ))}
        <TooltipTemplate content={"Full screen"}>
          <Button
            type="button"
            onClick={toggleFullscreen}
            className="w-10 h-10 md:w-12 md:h-12 hover:bg-background/90 hover:text-foreground [&_svg]:size-4 md:[&_svg]:size-5 shadow-lg"
            variant={"outline"}
            size={"icon"}
          >
            <span className="text-lg md:text-xl">
              {!state.isOpenFullScreen ? <Expand /> : <Minimize />}
            </span>
          </Button>
        </TooltipTemplate>
      </div>
    </div>
  );
};

export default React.memo(StickyMenu);
