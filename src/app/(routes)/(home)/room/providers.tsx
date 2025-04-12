"use client";
import { RoomDetailProvider } from "@/contexts/RoomDetailContext";
import React from "react";

const RoomProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RoomDetailProvider>{children}</RoomDetailProvider>;
};

export default RoomProviders;
