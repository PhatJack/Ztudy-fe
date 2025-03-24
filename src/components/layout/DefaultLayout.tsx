"use client";
import React from "react";
import Sidebar from "../includes/sidebar";
import Header from "../includes/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const location = usePathname();
  const isInRoom = location.startsWith("/room/");
  const isShowHeader = location === "/solo" || isInRoom;

  return (
    <>
      <div className={cn(isShowHeader && "overflow-hidden")}>
        <Sidebar />
        <main
          className={cn(
            "md:ml-24 h-full flex flex-col relative box-border",
            isShowHeader ? "p-5" : "p-0",
						// !isInRoom ? "md:ml-24" : ""
          )}
        >
          {!isShowHeader && (
            <>
              <Header />
            </>
          )}
          {children}
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
