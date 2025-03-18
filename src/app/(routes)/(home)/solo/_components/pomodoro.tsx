import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSoloContext } from "@/hooks/useSoloContext";
import { Clock, Minus, OctagonAlert, Plus, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
}

type TimerMode = 'focus' | 'break';
type TimeOperation = 'add' | 'subtract';

interface TimeChangeParams {
  type: TimerMode;
  operation: TimeOperation;
}

const DEFAULT_FOCUS_TIME = 50 * 60; // 50 minutes in seconds
const DEFAULT_BREAK_TIME = 10 * 60; // 10 minutes in seconds
const MIN_TIME = 5; // 5 minute in seconds
const MAX_TIME = 7200; // 2 hours in seconds

const Pomodoro: React.FC = () => {
  const [, dispatch] = useSoloContext();
  
  // Timer states
  const [focusTime, setFocusTime] = useState<number>(DEFAULT_FOCUS_TIME);
  const [breakTime, setBreakTime] = useState<number>(DEFAULT_BREAK_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<number>(focusTime);
  const [isLoopMode, setIsLoopMode] = useState<boolean>(false);

  const formatTime = (timeInSeconds: number): FormattedTime => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const handleTimeChange = ({ type, operation }: TimeChangeParams): void => {
    const timeState = type === 'focus' ? focusTime : breakTime;
    const setTimeState = type === 'focus' ? setFocusTime : setBreakTime;
    const change = operation === 'add' ? 300 : -300;
    
    const newTime = Math.max(MIN_TIME, Math.min(timeState + change, MAX_TIME));
    setTimeState(newTime);
    
    if (!isRunning && ((type === 'focus' && isFocusMode) || (type === 'break' && !isFocusMode))) {
      setRemainingTime(newTime);
    }
  };

  const toggleTimer = useCallback((): void => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback((): void => {
    setIsRunning(false);
    setIsFocusMode(true);
    setRemainingTime(focusTime);
  }, [focusTime]);

  const switchMode = useCallback((): void => {
    setIsFocusMode(prev => !prev);
    setRemainingTime(isFocusMode ? breakTime : focusTime);
  }, [isFocusMode, breakTime, focusTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      try {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(error => {
          console.warn('Failed to play notification sound:', error);
        });
      } catch (error) {
        console.warn('Error creating Audio object:', error);
      }

      if (isLoopMode) {
        // Nếu bật loop, tiếp tục chuyển đổi giữa focus và break
        switchMode();
      } else if (isFocusMode) {
        // Nếu không loop và đang ở focus, chuyển sang break
        switchMode();
      } else {
        // Nếu không loop và đang ở break, dừng timer
        setIsRunning(false);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, remainingTime, isLoopMode, isFocusMode, switchMode]);

  const { hours, minutes, seconds } = formatTime(remainingTime);

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
                Boost <strong>productivity</strong> with a focus session followed by a break.
                Toggle Loop automatically to repeat the cycle, or run a single focus-break session.
              </p>
            }
          >
            <span className="cursor-pointer">
              <OctagonAlert size={16} />
            </span>
          </TooltipTemplate>
          <span
            className="cursor-pointer"
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
            onClick={() => handleTimeChange({ type: 'focus', operation: 'subtract' })}
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
            onClick={() => handleTimeChange({ type: 'focus', operation: 'add' })}
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
            onClick={() => handleTimeChange({ type: 'break', operation: 'subtract' })}
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
            onClick={() => handleTimeChange({ type: 'break', operation: 'add' })}
            disabled={isRunning}
          >
            <Plus size={26} />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 !mt-4">
        <Switch 
          id="loop-mode" 
          className="data-[state=unchecked]:bg-gray-500"
          checked={isLoopMode}
          onCheckedChange={setIsLoopMode}
        />
        <Label htmlFor="loop-mode">Loop automatically</Label>
      </div>
      <div className="!mt-4 flex flex-col gap-2">
        <div className="text-center font-bold">
          {isFocusMode ? "Focus Time" : "Break Time"}
        </div>
        <div className="text-center text-3xl font-bold">
          {hours}:{minutes}:{seconds}
        </div>
        <Button 
          className="font-semibold"
          onClick={toggleTimer}
        >
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