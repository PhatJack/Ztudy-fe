"use client";
import React from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import Image from "next/image";
import { levelBorders, levels } from "@/constants/level-borders";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { getMonthlyLevelLabel } from "@/lib/get-border";

const MonthlyLevel = () => {
  const [state] = useAuthContext();

  return (
    <div className="w-full rounded-xl bg-background flex flex-col items-center space-y-4 p-6">
      <div className="w-full flex justify-between items-center">
        <span className="text-sm font-bold">Monthly Level</span>
      </div>
      <div className="p-4 rounded-lg flex flex-wrap justify-center items-center gap-4 bg-rose-100">
        {levelBorders.map((item, index) => {
          const userLevel = state.user?.monthly_level;
          const shouldShowAvatar =
            userLevel &&
            levels.indexOf(userLevel) >= levels.indexOf(item.level);
          return (
            <TooltipTemplate
              key={index}
              variant={"accent"}
              content={getMonthlyLevelLabel(item.level)}
            >
              <div className="relative size-6 flex justify-center items-center">
                <div className="size-4 rounded-full relative overflow-hidden animate-pulse">
                  <Image
                    fill
                    src={
                      shouldShowAvatar
                        ? state.user?.avatar || ""
                        : "/default.png"
                    }
                    alt="user avatar"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
                  />
                </div>
                <Image
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
                  fill
                  src={item.border ?? ""}
                  alt="border"
                />
              </div>
            </TooltipTemplate>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyLevel;
