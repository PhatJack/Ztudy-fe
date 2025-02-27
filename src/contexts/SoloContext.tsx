import React, { createContext, useMemo, useReducer, Dispatch } from "react";

// Define the type for the state
export type PanelType = "quote" | "studyStats" | "backgroundIframe";

export interface InitialState {
  isOpenPomodoro: boolean;
  isOpenSessionGoal: boolean;
  isOpenFullScreen: boolean;
  activePanel: "quote" | "studyStats" | "backgroundIframe" | null;
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
    };

// Create the initial state
const initialState: InitialState = {
  isOpenPomodoro: true,
  isOpenSessionGoal: true,
  isOpenFullScreen: false,
  activePanel: null, // Không có panel nào bật mặc định
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
