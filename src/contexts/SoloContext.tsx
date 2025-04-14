import { GoalSchema } from "@/lib/schemas/goal/goal.schema";
import React, { createContext, useMemo, useReducer, Dispatch } from "react";

// Define the type for the state
export type PanelType = "quote" | "studyStats" | "backgroundIframe" | "sound";

export interface SoundState {
  stream_url: string;
  sound_name: string;
  volume: number;
}

export interface InitialState {
  isOpenPomodoro: boolean;
  isOpenSessionGoal: boolean;
  isOpenFullScreen: boolean;
  activePanel: PanelType | null;
  quote: { content: string; author: string } | null;
  isDisplayQuote: boolean;
  volume: number;
  backgroundURL: string;
  isAddYtbScript: boolean;
  activeSounds: SoundState[];
  completedGoals: GoalSchema[];
  totalOpenGoals?: number;
}

// Define the action type
export type Action =
  | { type: "TOGGLE_BUTTON"; payload: "isOpenPomodoro" | "isOpenSessionGoal" }
  | {
      type: "SET_ACTIVE_PANEL";
      payload: PanelType | null;
    }
  | {
      type: "TOGGLE_FULL_SCREEN";
      payload: boolean;
    }
  | {
      type: "SHUFFLE_QUOTE";
      payload: { content: string; author: string };
    }
  | {
      type: "TOGGLE_QUOTE";
    }
  | {
      type: "SET_VOLUME";
      payload: number;
    }
  | {
      type: "SET_BACKGROUND";
      payload: string;
    }
  | {
      type: "SET_ADD_YTB_SCRIPT";
      payload: boolean;
    }
  | {
      type: "SAVE_ACTIVE_SOUNDS";
      payload: SoundState[];
    }
  | {
      type: "SAVE_COMPLETED_GOALS";
      payload: GoalSchema;
    }
  | {
      type: "SAVE_OPEN_GOALS";
      payload?: number;
    };

// Create the initial state
const initialState: InitialState = {
  isOpenPomodoro: true,
  isOpenSessionGoal: true,
  isOpenFullScreen: false,
  activePanel: "backgroundIframe", // Không có panel nào bật mặc định
  isDisplayQuote: true,
  quote: {
    content: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  volume: 0,
  backgroundURL: "https://www.youtube.com/watch?v=5wRWniH7rt8",
  isAddYtbScript: false,
  activeSounds: [],
  completedGoals: [],
  totalOpenGoals: 0,
};

// Create the context with an initial value of `null`
export const SoloContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
} | null>(null);

// Reducer function
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "TOGGLE_BUTTON":
      return { ...state, [action.payload]: !state[action.payload] };
    case "SET_ACTIVE_PANEL":
      return {
        ...state,
        activePanel:
          state.activePanel === action.payload ? null : action.payload,
      };
    case "TOGGLE_FULL_SCREEN":
      return { ...state, isOpenFullScreen: action.payload };
    case "SHUFFLE_QUOTE":
      return { ...state, quote: action.payload };
    case "TOGGLE_QUOTE":
      return { ...state, isDisplayQuote: !state.isDisplayQuote };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_BACKGROUND":
      return { ...state, backgroundURL: action.payload };
    case "SET_ADD_YTB_SCRIPT":
      return { ...state, isAddYtbScript: action.payload };
    case "SAVE_ACTIVE_SOUNDS":
      return { ...state, activeSounds: action.payload };
    case "SAVE_COMPLETED_GOALS":
      return {
        ...state,
        completedGoals: [...state.completedGoals, action.payload],
      };
    case "SAVE_OPEN_GOALS":
      return {
        ...state,
        totalOpenGoals: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const SoloProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <SoloContext.Provider value={value}>{children}</SoloContext.Provider>;
};
