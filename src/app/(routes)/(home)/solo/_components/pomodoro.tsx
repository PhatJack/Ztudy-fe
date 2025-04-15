import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePomodoroContext } from "@/contexts/SoloPomodoroContext";
import { useSoloContext } from "@/hooks/useSoloContext";
import { Clock, Minus, OctagonAlert, Plus, X } from "lucide-react";
import React from "react";

const Pomodoro: React.FC = () => {
  const {
    focusTime,
    breakTime,
    isRunning,
    isFocusMode,
    remainingTime,
    isLoopMode,
    formatTime,
    handleTimeChange,
    toggleTimer,
    resetTimer,
    setIsLoopMode,
  } = usePomodoroContext();
  const [state, dispatch] = useSoloContext();
  const { hours, minutes, seconds } = formatTime(remainingTime);

  return (
    <div className="w-full p-5 rounded-md bg-background flex flex-col space-y-3 shadow-lg">
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
                Boost <strong>productivity</strong> with a focus session
                followed by a break. Toggle Loop automatically to repeat the
                cycle, or run a single focus-break session.
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
						className="cursor-pointer"
          >
            <X size={16} />
          </span>
        </div>
      </div>
      {!isRunning ? (
        <div className="">
          <p className="text-xs mb-1 text-center">
            <strong>Focus time(min)</strong>
          </p>
          <div className="w-full flex items-center gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-transparent hover:text-primary aspect-square"
              onClick={() =>
                handleTimeChange({ type: "focus", operation: "subtract" })
              }
              disabled={isRunning}
            >
              <Minus size={26} />
            </Button>
            <div className="w-full px-2 py-1 rounded-full flex space-x-1 justify-center items-center bg-secondary text-secondary-foreground font-semibold antialiased text-2xl">
              <span>{formatTime(focusTime).hours}</span>
              <span className="mb-1">:</span>
              <span>{formatTime(focusTime).minutes}</span>
              <span className="mb-1">:</span>
              <span>{formatTime(focusTime).seconds}</span>
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-transparent hover:text-primary aspect-square"
              onClick={() =>
                handleTimeChange({ type: "focus", operation: "add" })
              }
              disabled={isRunning}
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
              onClick={() =>
                handleTimeChange({ type: "break", operation: "subtract" })
              }
              disabled={isRunning}
            >
              <Minus size={26} />
            </Button>
            <div className="w-full px-2 py-1 rounded-full flex space-x-1 justify-center items-center bg-secondary text-secondary-foreground font-semibold antialiased text-2xl">
              <span>{formatTime(breakTime).hours}</span>
              <span className="mb-1">:</span>
              <span>{formatTime(breakTime).minutes}</span>
              <span className="mb-1">:</span>
              <span>{formatTime(breakTime).seconds}</span>
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-transparent hover:text-primary aspect-square"
              onClick={() =>
                handleTimeChange({ type: "break", operation: "add" })
              }
              disabled={isRunning}
            >
              <Plus size={26} />
            </Button>
          </div>
        </div>
      ) : null}
      {!isRunning ? (
        <div className="flex items-center space-x-2 !mt-4">
          <Switch
            id="loop-mode"
            className="data-[state=unchecked]:bg-gray-500"
            checked={isLoopMode}
            onCheckedChange={setIsLoopMode}
          />
          <Label htmlFor="loop-mode">Loop automatically</Label>
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        {isRunning ? (
          <div className="mt-4">
            <div className="text-center text-sm font-bold">
              {isFocusMode ? "Focus Time" : "Break Time"}
            </div>
            <div className="text-center text-3xl font-bold">
              {hours}:{minutes}:{seconds}
            </div>
          </div>
        ) : null}
        <Button className="font-semibold" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"} timer
        </Button>
        {isRunning && (
          <Button
            variant="outline"
            className="font-semibold"
            onClick={resetTimer}
          >
            Reset timer
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Pomodoro);
