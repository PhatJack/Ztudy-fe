"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { getQueryClient } from "./get-query-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SoloProvider } from "@/contexts/SoloContext";

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
        <NextTopLoader color="hsl(340 100% 60%)" />
        <TooltipProvider>
          <SoloProvider>{children}</SoloProvider>
        </TooltipProvider>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
