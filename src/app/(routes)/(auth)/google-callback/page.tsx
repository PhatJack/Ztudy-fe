"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useOnlineWebSocket } from '@/contexts/OnlineWebSocketContext';
import { checkPreferencesApi } from '@/service/(users)/check-preferences.api';
import { setCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const GoogleCallbackPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [state, dispatch] = useAuthContext();
  const { connectOnlineSocket } = useOnlineWebSocket();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Extract the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          toast.error('Authentication failed');
          router.push('/login');
          return;
        }

        // Verify the Google authentication with your backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_SERVER_URL}/auth/google/verify/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        
        // Check user preferences
        try {
          const res = await checkPreferencesApi(data.user.id);
          if (res.status === 200) {
            dispatch({ type: "CHECK_PREFERENCES", payload: false });
          }
        } catch (error) {
          dispatch({ type: "CHECK_PREFERENCES", payload: true });
        }

        // Set cookie and update auth context
        setCookie("isLoggedIn", "1", {
          maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
          secure: true,
          sameSite: "lax",
        });
        dispatch({ type: "SET_USER", payload: data.user });
        
        // Connect to online socket
        connectOnlineSocket();
        
        setIsLoading(false);
        toast.success('Login successful');
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              router.push('/dashboard');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } catch (error) {
        console.error('Google authentication error:', error);
        toast.error('Authentication failed');
        router.push('/login');
      }
    };

    // handleGoogleCallback();
  }, []);

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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Login Successful!</h1>
          <p className="text-center text-muted-foreground">
            You have successfully logged in with Google.
          </p>
          <p className="text-lg font-medium">
            Redirecting to dashboard in <span className="text-primary font-bold">{countdown}</span> seconds...
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleCallbackPage;