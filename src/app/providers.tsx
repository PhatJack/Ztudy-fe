"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { getQueryClient } from "./get-query-client";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <NextTopLoader color="hsl(30 100% 70%)" />
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
