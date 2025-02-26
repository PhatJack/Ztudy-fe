"use client";
import { Clock, Target } from "lucide-react";
import BackgroundIframe from "./components/BackgroundIframe";
import { Button } from "@/components/ui/button";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { menuButton } from "@/constants/solo-button-menu";
import SessionGoal from "./components/session-goal";
import Pomodoro from "./components/pomodoro";
import { useSoloContext } from "@/hooks/useSoloContext";
import { ButtonType } from "@/contexts/SoloContext";
import Quote from "./components/quote";

export default function Solo() {
  const [state, dispatch] = useSoloContext();

  console.log(state);

  return (
    <>
      <BackgroundIframe src="https://www.youtube.com/watch?v=ntLop32pYd0&list=RD8D9d9weVQnI&index=2" />
      <div className="relative">
        <div className="relative size-full flex justify-between items-center h-12 mb-4">
          <div className="flex gap-4">
            <div
              onClick={() => {
                dispatch({ type: "TOGGLE_BUTTON", payload: "isOpenPomodoro" });
              }}
              className="shadow-lg h-full px-4 py-1 flex flex-col justify-center items-center gap-0.5 bg-background hover:bg-background/90 cursor-pointer text-foreground  rounded-md"
            >
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Clock size={16} />
                </div>
                <span className="text-xs font-medium leading-[1.15rem]">
                  Personal timer
                </span>
              </div>
              <p className="text-sm">
                <strong>50:00:00</strong>
              </p>
            </div>
            <div
              onClick={() => {
                dispatch({
                  type: "TOGGLE_BUTTON",
                  payload: "isOpenSessionGoal",
                });
              }}
              className="shadow-lg h-full px-4 py-1 flex flex-col justify-center items-center gap-0.5 bg-background hover:bg-background/90 cursor-pointer text-foreground rounded-md"
            >
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Target size={16} />
                </div>
                <span className="text-xs font-medium leading-[1.15rem]">
                  Study goal
                </span>
              </div>
              <p className="text-sm">
                <strong>0 / 1</strong>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {menuButton.map((item, index) => (
              <TooltipTemplate content={item.label} key={index}>
                <Button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "TOGGLE_BUTTON",
                      payload: item.variable as ButtonType,
                    });
                  }}
                  className="w-12 h-12 hover:bg-background/90 hover:text-foreground [&_svg]:size-5 shadow-lg"
                  variant={"outline"}
                  size={"icon"}
                >
                  <span className="text-xl">
                    <item.icon />
                  </span>
                </Button>
              </TooltipTemplate>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[calc(100vh-3rem-1rem-2.5rem)] rounded-md overflow-hidden">
          <div className="absolute top-0 left-0 flex flex-col gap-6 min-w-64">
            {state.isOpenPomodoro ? <Pomodoro /> : null}
            {state.isOpenSessionGoal ? <SessionGoal /> : null}
          </div>
          <div className="absolute top-0 right-0 flex flex-col min-w-64">
            {state.isOpenQuote ? <Quote /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
