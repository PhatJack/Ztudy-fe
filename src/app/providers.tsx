"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { getQueryClient } from "./get-query-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

const queryClient = getQueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="hsl(150 30% 45%)" zIndex={9999} />
        <AuthProvider>
          <ChatProvider>
            <WebSocketProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </WebSocketProvider>
          </ChatProvider>
        </AuthProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
