"use client";
import React, { use, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "../includes/sidebar";
import { Separator } from "../ui/separator";
import Header from "../includes/header";
import { redirect, usePathname } from "next/navigation";

const queryClient = new QueryClient();

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const location = usePathname();
  const isSolo = location === "/solo";

  return (
    <>
      <div className="relative h-full w-full flex flex-col md:flex-row">
        <Sidebar />
        <Separator orientation="vertical" />
        <div className="w-full flex flex-col">
          {!isSolo && <Header />}
          <Separator />
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
