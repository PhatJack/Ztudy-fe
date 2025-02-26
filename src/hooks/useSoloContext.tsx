"use client"
import { Dispatch, useContext } from "react";
import { SoloContext, InitialState, Action } from "@/contexts/SoloContext";

// Define the return type explicitly to match SoloContextType
export const useSoloContext = (): [InitialState, Dispatch<Action>] => {
  const context = useContext(SoloContext);
  if (!context) {
    throw new Error("useSoloContext must be used within a SoloProvider");
  }
  return [context.state, context.dispatch];
};
