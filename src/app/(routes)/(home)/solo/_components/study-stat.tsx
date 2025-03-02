"use client";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSoloContext } from "@/hooks/useSoloContext";
import {
  ChartNoAxesColumn,
  Clock,
  OctagonAlert,
  Trophy,
  X,
} from "lucide-react";
import React, { useState } from "react";

const StudyStat = () => {
  const [selectedOption, setSelectedOption] = useState("today");
  const [, dispatch] = useSoloContext();

  return (
    <div className="shadow-lg p-5 rounded-md bg-background w-[267px] min-w-[267px]">
      <div className="flex justify-between items-center">
        <span className="text-xs inline-flex items-center gap-1">
          <ChartNoAxesColumn size={14} />
          <strong>Study stats</strong>
        </span>
        <div className="flex items-center gap-2">
          <TooltipTemplate
            variant={"secondary"}
            content={
              <p>
                <strong>Study Stat</strong> helps you keep track of your
                learning progress in a simple and encouraging way. See how much
                you’ve studied, what you’ve completed, and where you can
                improve—all to support your growth and keep you motivated!
              </p>
            }
          >
            <span className="cursor-pointer">
              <OctagonAlert size={16} />
            </span>
          </TooltipTemplate>
          <span
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_PANEL", payload: "studyStats" })
            }
          >
            <X size={16} />
          </span>
        </div>
      </div>
      <Separator className="mt-2 mb-4" />
      <div className="flex flex-col space-y-2">
        <div className="flex">
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value);
            }}
          >
            <SelectTrigger className="w-[120px] bg-background border-gray-400">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-3 rounded-md bg-muted flex gap-3">
          <span className="rounded-md max-w-12 w-full aspect-square bg-background flex items-center justify-center">
            <Clock />
          </span>
          <div className="flex flex-col justify-between gap-1">
            <span className="text-xs font-medium">Total study time</span>
            <span className="text-xl font-extrabold">24h</span>
          </div>
        </div>
        <div className="p-3 rounded-md bg-muted flex gap-3">
          <span className="rounded-md max-w-12 w-full aspect-square bg-background flex items-center justify-center">
            <Trophy />
          </span>
          <div className="flex flex-col justify-between gap-1">
            <span className="text-xs font-medium">Leaderboard rank</span>
            <span className="text-xl font-extrabold text-yellow-500 inline-flex items-center">
              <span>#1</span>
              <span className="pb-1">👑</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStat;
