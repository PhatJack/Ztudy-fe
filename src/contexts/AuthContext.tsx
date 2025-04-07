"use client";
import {
  CurrentUserResponseSchema,
  getCurrentUserInformationApi,
} from "@/service/(current-user)/get-current-user-information.api";
import { createContext, Dispatch, useEffect, useMemo, useReducer } from "react";
import { useOnlineWebSocket } from "./OnlineWebSocketContext";
import { getCookie } from "cookies-next";
export interface InitialAuthState {
  user: CurrentUserResponseSchema | null;
  isCheckPreferences: boolean | null;
}

const initialState: InitialAuthState = {
  user: null,
  isCheckPreferences: null,
};

export type AuthAction =
  | {
      type: "SET_USER";
      payload: CurrentUserResponseSchema | null;
    }
  | {
      type: "CHECK_PREFERENCES";
      payload: boolean | null;
    };

export const AuthContext = createContext<{
  state: InitialAuthState;
  dispatch: Dispatch<AuthAction>;
} | null>(null);

export const soloReducer = (
  state: InitialAuthState,
  action: AuthAction
): InitialAuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CHECK_PREFERENCES":
      return { ...state, isCheckPreferences: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { connectOnlineSocket } = useOnlineWebSocket();
  const [state, dispatch] = useReducer(soloReducer, initialState);

  useEffect(() => {
    const getUser = async () => {
      const res = await getCurrentUserInformationApi();
      if (res) {
        dispatch({ type: "SET_USER", payload: res });
        connectOnlineSocket();
      }
    };
    if (localStorage.getItem("auth") === "true") {
      getUser();
    }
  }, [connectOnlineSocket]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
