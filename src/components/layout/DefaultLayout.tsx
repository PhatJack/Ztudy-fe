"use client"
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from 'nextjs-toploader';

const queryClient = new QueryClient();

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
			<NextTopLoader />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default DefaultLayout;
