"use client";
import {
  CurrentUserResponseSchema,
  getCurrentUserInformationApi,
} from "@/service/(current-user)/get-current-user-information.api";
import { createContext, Dispatch, useEffect, useMemo, useReducer } from "react";

export interface InitialAuthState {
  user: CurrentUserResponseSchema | null;
}

const initialState: InitialAuthState = {
  user: null,
};

export type AuthAction = {
  type: "SET_USER";
  payload: CurrentUserResponseSchema | null;
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
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(soloReducer, initialState);

  useEffect(() => {
    const getUser = async () => {
      const res = await getCurrentUserInformationApi();
      if (res) {
        dispatch({ type: "SET_USER", payload: res });
      }
    };
    getUser();
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
