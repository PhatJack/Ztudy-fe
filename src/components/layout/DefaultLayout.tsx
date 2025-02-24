"use client";
import React from "react";
import { QueryClient } from "@tanstack/react-query";
import Sidebar from "../includes/sidebar";
import { Separator } from "../ui/separator";
import Header from "../includes/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const location = usePathname();
  const isSolo = location === "/solo";

  return (
    <>
      <div className={cn("overflow-hidden")}>
        <Sidebar />
        <main
          className={cn(
            "ml-24 h-full flex flex-col relative box-border",
            isSolo ? "p-5" : "p-0"
          )}
        >
          {!isSolo && (
            <>
              <Header />
              <Separator />
            </>
          )}
          {children}
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
