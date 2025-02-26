import React, { createContext, useMemo, useReducer, Dispatch } from "react";

// Define the type for the state
export interface InitialState {
  isOpenPomodoro: boolean;
  isOpenSessionGoal: boolean;
  isOpenQuote: boolean;
  isOpenStudyStats: boolean;
  isOpenBackgroundIframe: boolean;
  isOpenFullscreen: boolean;
}
export type ButtonType =
  | "isOpenPomodoro"
  | "isOpenSessionGoal"
  | "isOpenQuote"
  | "isOpenStudyStats"
  | "isOpenBackgroundIframe"
  | "isOpenFullscreen";

// Define the action type
export type Action = { type: "TOGGLE_BUTTON"; payload: ButtonType };

// Define the context type
interface SoloContextType {
  state: InitialState;
  dispatch: Dispatch<Action>;
}

// Create the initial state
const initialState: InitialState = {
  isOpenPomodoro: true,
  isOpenSessionGoal: true,
  isOpenQuote: false,
  isOpenStudyStats: false,
  isOpenBackgroundIframe: false,
  isOpenFullscreen: false,
};

// Create the context with an initial value of `null`
export const SoloContext = createContext<SoloContextType | null>(null);

// Reducer function
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "TOGGLE_BUTTON":
			console.log(action.payload)
      return { ...state, [action.payload]: !state[action.payload] };
    default:
      return state;
  }
};

// Provider component
export const SoloProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <SoloContext.Provider value={value}>{children}</SoloContext.Provider>;
};
