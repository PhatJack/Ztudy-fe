"use client";
import React from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import Image from "next/image";

const MonthlyLevel = () => {
  const [state, dispatch] = useAuthContext();

  const imageLists: string[] = [
    "/borders/1.png",
    "/borders/2.png",
    "/borders/3.png",
    "/borders/4.png",
    "/borders/5.png",
    "/borders/6.png",
    "/borders/7.png",
    "/borders/8.png",
    "/borders/9.png",
    "/borders/10.png",
    "/borders/11.png",
    "/borders/12.png",
  ];

  return (
    <div className="w-full rounded-xl bg-background flex flex-col items-center space-y-4 p-6">
      <div className="w-full flex justify-between items-center">
        <span className="text-sm font-bold">Monthly Level</span>
      </div>
      <div className="p-4 rounded-lg flex flex-wrap justify-center items-center gap-4 bg-rose-100">
        {imageLists.map((image, index) => (
          <div key={index} className="relative size-6 flex justify-center items-center">
            <div className="size-4 rounded-full bg-red-300"></div>
            <Image fill src={image} alt="border" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyLevel;
