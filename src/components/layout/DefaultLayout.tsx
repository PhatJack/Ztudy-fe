"use client";
import React, { useEffect } from "react";
import Sidebar from "../includes/sidebar";
import Header from "../includes/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import PreferencesScreen from "../check-preference/preferences-screen";

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
        {!isInRoom && <Sidebar />}
        <main
          className={cn(
            "h-full flex flex-col relative box-border",
            isShowHeader ? "p-6" : "p-0",
            !isInRoom ? "md:ml-24" : ""
          )}
        >
          {!isShowHeader && (
            <>
              <Header />
            </>
          )}
          {children}
        </main>
        <PreferencesScreen />
      </div>
    </>
  );
};

export default DefaultLayout;
