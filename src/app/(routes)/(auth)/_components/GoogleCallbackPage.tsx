"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";
import { checkPreferencesApi } from "@/service/(users)/check-preferences.api";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { getCurrentUserInformationApi } from "@/service/(current-user)/get-current-user-information.api";
import { useRouter } from "next/navigation";

const GoogleCallbackPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [, dispatch] = useAuthContext();
  const { connectOnlineSocket } = useOnlineWebSocket();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<"success" | "error">("success");

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");

        if (status === "success") {
          setStatus("success");
          const res = await getCurrentUserInformationApi();
          if (res) {
            dispatch({ type: "SET_USER", payload: res });
          }

          try {
            const prefRes = await checkPreferencesApi(res.id);
            if (prefRes.status === 200) {
              dispatch({ type: "CHECK_PREFERENCES", payload: false });
            } else {
              dispatch({ type: "CHECK_PREFERENCES", payload: true });
            }
          } catch (err) {
            dispatch({ type: "CHECK_PREFERENCES", payload: true });
          }

          connectOnlineSocket();

          setCookie("isLoggedIn", "1", {
            maxAge: 60 * 60 * 24 * 365,
            secure: true,
            sameSite: "lax",
          });
          setIsLoading(false);
        } else {
          setStatus("error");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Google authentication error:", error);
        toast.error("Authentication failed");
        setStatus("error");
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [dispatch, connectOnlineSocket]);

  // Separate effect for countdown and navigation
  useEffect(() => {
    if (isLoading) return; // Only start countdown after loading is complete

    const redirectPath = status === "error" ? "/login" : "/dashboard";

    if (countdown <= 0) {
      router.push(redirectPath);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, status, isLoading, router]);

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Verifying your Google login...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            {status === "error" ? (
              <XCircle className="h-12 w-12 text-red-500" />
            ) : (
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            )}
          </div>
          {status === "error" ? (
            <h1 className="text-2xl font-bold text-red-500">Login Failed!</h1>
          ) : (
            <h1 className="text-2xl font-bold text-green-500">
              Login Successful!
            </h1>
          )}
          <p className="text-center text-muted-foreground">
            {status === "error"
              ? "There was an error logging in with Google. Please try again."
              : "You have successfully logged in with Google."}
          </p>
          <p className="text-lg font-medium">
            Redirecting to {status === "error" ? "login" : "dashboard"} in{" "}
            <span className="text-primary font-bold">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleCallbackPage;
