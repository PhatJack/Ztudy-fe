import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

// Types
interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
}

type TimerMode = "focus" | "break";
type TimeOperation = "add" | "subtract";

interface TimeChangeParams {
  type: TimerMode;
  operation: TimeOperation;
}

interface PomodoroState {
  focusTime: number;
  breakTime: number;
  isRunning: boolean;
  isFocusMode: boolean;
  remainingTime: number;
  isLoopMode: boolean;
}

interface PomodoroContextType extends PomodoroState {
  formatTime: (timeInSeconds: number) => FormattedTime;
  handleTimeChange: (params: TimeChangeParams) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchMode: () => void;
  setIsLoopMode: (value: boolean) => void;
}

// Constants
const DEFAULT_FOCUS_TIME = 50 * 60; // 50 minutes in seconds
const DEFAULT_BREAK_TIME = 10 * 60; // 10 minutes in seconds
const MIN_TIME = 5 * 60; // 5 minutes in seconds
const MAX_TIME = 7200; // 2 hours in seconds

// Create context
const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

// Reducer for state management
type PomodoroAction =
  | { type: "SET_FOCUS_TIME"; payload: number }
  | { type: "SET_BREAK_TIME"; payload: number }
  | { type: "SET_IS_RUNNING"; payload: boolean }
  | { type: "SET_IS_FOCUS_MODE"; payload: boolean }
  | { type: "SET_REMAINING_TIME"; payload: number }
  | { type: "SET_IS_LOOP_MODE"; payload: boolean }
  | { type: "RESET_TIMER" };

const pomodoroReducer = (
  state: PomodoroState,
  action: PomodoroAction
): PomodoroState => {
  switch (action.type) {
    case "SET_FOCUS_TIME":
      return { ...state, focusTime: action.payload };
    case "SET_BREAK_TIME":
      return { ...state, breakTime: action.payload };
    case "SET_IS_RUNNING":
      return { ...state, isRunning: action.payload };
    case "SET_IS_FOCUS_MODE":
      return { ...state, isFocusMode: action.payload };
    case "SET_REMAINING_TIME":
      return { ...state, remainingTime: action.payload };
    case "SET_IS_LOOP_MODE":
      return { ...state, isLoopMode: action.payload };
    case "RESET_TIMER":
      return {
        ...state,
        isRunning: false,
        isFocusMode: true,
        remainingTime: state.focusTime,
      };
    default:
      return state;
  }
};

// Provider component
export const SoloPomodoroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: PomodoroState = {
    focusTime: DEFAULT_FOCUS_TIME,
    breakTime: DEFAULT_BREAK_TIME,
    isRunning: false,
    isFocusMode: true,
    remainingTime: DEFAULT_FOCUS_TIME,
    isLoopMode: false,
  };

  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  const formatTime = (timeInSeconds: number): FormattedTime => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const handleTimeChange = ({ type, operation }: TimeChangeParams): void => {
    const timeState = type === "focus" ? state.focusTime : state.breakTime;
    const setTimeState =
      type === "focus"
        ? (time: number) => dispatch({ type: "SET_FOCUS_TIME", payload: time })
        : (time: number) => dispatch({ type: "SET_BREAK_TIME", payload: time });

    const change = operation === "add" ? 300 : -300;
    const newTime = Math.max(MIN_TIME, Math.min(timeState + change, MAX_TIME));

    setTimeState(newTime);

    if (
      !state.isRunning &&
      ((type === "focus" && state.isFocusMode) ||
        (type === "break" && !state.isFocusMode))
    ) {
      dispatch({ type: "SET_REMAINING_TIME", payload: newTime });
    }
  };

  const toggleTimer = useCallback((): void => {
    dispatch({ type: "SET_IS_RUNNING", payload: !state.isRunning });
  }, [state.isRunning]);

  const resetTimer = useCallback((): void => {
    dispatch({ type: "RESET_TIMER" });
  }, []);

  const switchMode = useCallback((): void => {
    const newIsFocusMode = !state.isFocusMode;
    const newTime = newIsFocusMode ? state.focusTime : state.breakTime;
    dispatch({ type: "SET_IS_FOCUS_MODE", payload: newIsFocusMode });
    dispatch({
      type: "SET_REMAINING_TIME",
      payload: newTime,
    });
  }, [state.isFocusMode, state.breakTime, state.focusTime]);

  const setIsLoopMode = useCallback((value: boolean): void => {
    dispatch({ type: "SET_IS_LOOP_MODE", payload: value });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (state.isRunning && state.remainingTime > 0) {
      interval = setInterval(() => {
        dispatch({
          type: "SET_REMAINING_TIME",
          payload: state.remainingTime - 1,
        });
      }, 1000);
    } else if (state.remainingTime === 0) {
      try {
        const audio = new Audio("/notification.mp3");
        audio.play().catch((error) => {
          console.warn("Failed to play notification sound:", error);
        });
      } catch (error) {
        console.warn("Error creating Audio object:", error);
      }

      if (state.isLoopMode) {
        // Nếu bật loop, tiếp tục chuyển đổi giữa focus và break
        switchMode();
      } else if (state.isFocusMode) {
        // Nếu không loop và đang ở focus, chuyển sang break
        switchMode();
      } else {
        // Nếu không loop và đang ở break, dừng timer
        dispatch({ type: "SET_IS_RUNNING", payload: false });
        dispatch({ type: "SET_REMAINING_TIME", payload: state.focusTime });
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    state.isLoopMode,
    switchMode,
    state.isRunning,
    state.remainingTime,
    state.isFocusMode,
  ]);

  // Display timer in title
  useEffect(() => {
    if (!state.isRunning) {
      document.title = "Solo | Ztudy";
    } else {
      const { hours, minutes, seconds } = formatTime(state.remainingTime);
      document.title =
        state.remainingTime >= 3600
          ? `${hours}:${minutes}:${seconds} - Solo | Ztudy`
          : `${minutes}:${seconds} - Solo | Ztudy`;
    }
  }, [state.remainingTime, state.isRunning]);

  const value = {
    ...state,
    formatTime,
    handleTimeChange,
    toggleTimer,
    resetTimer,
    switchMode,
    setIsLoopMode,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};

// Custom hook for using the pomodoro context
export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error(
      "usePomodoroContext must be used within a SoloPomodoroProvider"
    );
  }
  return context;
};
