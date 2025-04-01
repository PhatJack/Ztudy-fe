"use client";
import {
  AuthAction,
  AuthContext,
  InitialAuthState,
} from "@/contexts/AuthContext";
import { Dispatch, useContext } from "react";

// Define the return type explicitly to match SoloContextType
export const useAuthContext = (): [InitialAuthState, Dispatch<AuthAction>] => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return [context.state, context.dispatch];
};
