"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "../includes/sidebar";
import { Separator } from "../ui/separator";

const queryClient = new QueryClient();

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="relative h-full w-full flex flex-col md:flex-row">
          <NextTopLoader color="hsl(38,100%,70%)" />
          <Sidebar />
          <Separator orientation="vertical" />
          {children}
        </div>
      </QueryClientProvider>
      <Toaster />
    </>
  );
};

export default DefaultLayout;
