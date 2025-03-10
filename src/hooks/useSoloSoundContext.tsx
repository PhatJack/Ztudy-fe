"use client";
import { Dispatch, useContext } from "react";
import {
  SoloSoundContext,
  InitialState,
  Action,
} from "@/contexts/SoloSoundContext";

// Define the return type explicitly to match SoloContextType
export const useSoloSoundContext = (): [InitialState, Dispatch<Action>] => {
  const context = useContext(SoloSoundContext);
  if (!context) {
    throw new Error("useSoloSoundContext must be used within a SoloProvider");
  }
  return [context.state, context.dispatch];
};
