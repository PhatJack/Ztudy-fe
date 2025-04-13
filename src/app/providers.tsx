"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { getQueryClient } from "./get-query-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { OnlineWebSocketProvider } from "@/contexts/OnlineWebSocketContext";
import dynamic from "next/dynamic";

const queryClient = getQueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ReactQueryDevtools =
    process.env.NODE_ENV === "development"
      ? dynamic(
          () =>
            import("@tanstack/react-query-devtools").then(
              (mod) => mod.ReactQueryDevtools
            ),
          {
            ssr: false,
          }
        )
      : () => null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="hsl(150 30% 45%)" zIndex={9999} />
        <OnlineWebSocketProvider>
          <AuthProvider>
            <ChatProvider>
              <WebSocketProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </WebSocketProvider>
            </ChatProvider>
          </AuthProvider>
        </OnlineWebSocketProvider>
        <Toaster />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
