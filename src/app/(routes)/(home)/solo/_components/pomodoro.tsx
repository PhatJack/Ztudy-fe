import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSoloContext } from "@/hooks/useSoloContext";
import { Clock, Minus, OctagonAlert, Plus, X } from "lucide-react";
import React from "react";

const Pomodoro = () => {
  const [, dispatch] = useSoloContext();

  return (
    <div className="w-[267px] min-w-[267px] p-5 rounded-md bg-background flex flex-col space-y-2 shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-xs inline-flex items-center gap-1">
          <Clock size={14} />
          <strong>Personal Timer</strong>
        </span>
        <div className="flex items-center gap-2">
          <TooltipTemplate
            variant={"accent"}
            content={
              <p>
                Boost <strong>productivity</strong> and stay on track with this
                simple trick: set a personal timer for focused work (try 25
                minutes!), followed by a 5-minute break. Known as the Pomodoro
                Technique, this method helps you tackle tasks without burnout.
                Customize your timer to fit your rhythm—whether it’s 15 minutes
                for quick wins or 90 minutes for deep focus. Time’s
                ticking—start small, win big!
              </p>
            }
          >
            <span className="cursor-pointer">
              <OctagonAlert size={16} />
            </span>
          </TooltipTemplate>
          <span
            onClick={() =>
              dispatch({ type: "TOGGLE_BUTTON", payload: "isOpenPomodoro" })
            }
          >
            <X size={16} />
          </span>
        </div>
      </div>
      <div className="">
        <p className="text-xs mb-1 text-center">
          <strong>Focus time(min)</strong>
        </p>
        <div className="w-full flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-transparent hover:text-primary aspect-square"
          >
            <Minus size={26} />
          </Button>
          <div className="w-full px-2 py-1 rounded-full flex space-x-1 justify-center items-center bg-secondary text-secondary-foreground font-semibold antialiased text-2xl">
            <span>00</span>
            <span className="mb-1 ">:</span>
            <span>25</span>
            <span className="mb-1">:</span>
            <span>00</span>
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-transparent hover:text-primary aspect-square"
          >
            <Plus size={26} />
          </Button>
        </div>
        <p className="text-xs mb-1 mt-3 text-center">
          <strong>Break time(min)</strong>
        </p>
        <div className="w-full flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-transparent hover:text-primary aspect-square"
          >
            <Minus size={26} />
          </Button>
          <div className="w-full px-2 py-1 rounded-full flex space-x-1 justify-center items-center bg-secondary text-secondary-foreground font-semibold antialiased text-2xl">
            <span>00</span>
            <span className="mb-1 ">:</span>
            <span>25</span>
            <span className="mb-1">:</span>
            <span>00</span>
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-transparent hover:text-primary aspect-square"
          >
            <Plus size={26} />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 !mt-4">
        <Switch id="loop-mode" className="data-[state=unchecked]:bg-gray-500"/>
        <Label htmlFor="loop-mode">Loop automatically</Label>
      </div>
      <Button className="!mt-4 font-semibold">Start timer</Button>
    </div>
  );
};

export default React.memo(Pomodoro);
