import React, { createContext, useMemo, useReducer, Dispatch } from "react";

// Define the type for the state
export interface InitialState {
  sounds:
    | {
        sound_file: string;
        sound_name: string;
        volume: number;
      }[]
    | null;
}

// Define action types
export type Action =
  | { type: "SET_SOUNDS"; payload: InitialState["sounds"] }
  | { type: "UPDATE_VOLUME"; payload: { sound_file: string; volume: number } };

// Create the initial state
const initialState: InitialState = {
  sounds: null,
};

// Create the context with an initial value of `null`
export const SoloSoundContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
} | null>(null);

// Reducer function
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "SET_SOUNDS":
      return { ...state, sounds: action.payload };
    case "UPDATE_VOLUME":
      return {
        ...state,
        sounds: state.sounds
          ? state.sounds.map((sound) =>
              sound.sound_file === action.payload.sound_file
                ? { ...sound, volume: action.payload.volume }
                : sound
            )
          : null,
      };

    default:
      return state;
  }
};

// Provider component
export const SoloSoundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <SoloSoundContext.Provider value={value}>
      {children}
    </SoloSoundContext.Provider>
  );
};
