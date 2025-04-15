"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSoloContext } from "@/hooks/useSoloContext";
import { getMonthlyLevelLabel } from "@/lib/get-border";
import { useStatStudyTime } from "@/service/(stats)/stat-study-time.api";
import { getLevelColor } from "@/util/generateRandomColorForLevel";
import { useQuery } from "@tanstack/react-query";
import {
  ChartNoAxesColumn,
  Clock,
  OctagonAlert,
  Trophy,
  UserRoundCog,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useMemo, useState } from "react";

const StudyStat = () => {
  const { theme } = useTheme();
  const studyStatsQuery = useQuery({
    ...useStatStudyTime(),
    refetchOnWindowFocus: false,
  });

  const studyStats = useMemo(() => {
    return studyStatsQuery.data;
  }, [studyStatsQuery]);

  const [selectedOption, setSelectedOption] = useState<
    "today" | "week" | "month" | "all"
  >("today");
  const [, dispatch] = useSoloContext();

  return (
    <div className="shadow-lg p-5 rounded-md bg-background w-full">
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
      <div className="flex flex-col space-y-3">
        <div className="flex">
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value as "today" | "week" | "month" | "all");
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
        {studyStatsQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Total study time */}
            <div className="p-3 rounded-md bg-muted flex gap-3">
              <span className="rounded-md max-w-12 w-full aspect-square bg-background flex items-center justify-center">
                <Clock />
              </span>
              <div className="flex flex-col justify-between gap-1">
                <span className="text-xs font-medium">Total study time</span>
                <span className="text-xl font-extrabold">
                  {selectedOption === "week"
                    ? studyStats?.study.week
                    : selectedOption === "month"
                    ? studyStats?.study.month
                    : studyStats?.study.today}
                  h
                </span>
              </div>
            </div>

            {/* User stat */}
            <div className="p-3 rounded-md bg-muted flex flex-col gap-3">
              <div className="flex gap-3">
                <span className="rounded-md max-w-12 w-full aspect-square bg-background flex items-center justify-center">
                  <UserRoundCog />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-xs">Current Monthly Level</p>
                  <p
                    style={
                      studyStats?.current_monthly_level
                        ? {
                            color: getLevelColor(
                              studyStats?.current_monthly_level.level,
                              theme === "dark" ? "dark" : "light"
                            ),
                          }
                        : undefined
                    }
                    className="font-bold"
                  >
                    {" "}
                    {studyStats?.current_monthly_level.level &&
                      getMonthlyLevelLabel(
                        studyStats.current_monthly_level.level
                      )}
                  </p>
                </div>
              </div>
              {studyStats?.current_monthly_level.progress && (
                <Progress
                  value={studyStats?.current_monthly_level.progress * 100}
                  className="border-2 border-background h-3"
                />
              )}
              <div className="text-xs">
                <strong>
                  {studyStats?.current_monthly_level.time_to_next_level} hours
                </strong>{" "}
                left until:{" "}
                <span
                  style={
                    studyStats?.current_monthly_level
                      ? {
                          color: getLevelColor(
                            studyStats?.current_monthly_level.next_level,
                            theme === "dark" ? "dark" : "light"
                          ),
                        }
                      : undefined
                  }
                >
                  {studyStats?.current_monthly_level.next_level &&
                    getMonthlyLevelLabel(
                      studyStats.current_monthly_level.next_level
                    )}
                </span>
              </div>
            </div>

            {/* Leaderboard rank */}
            <div className="p-3 rounded-md bg-muted flex gap-3">
              <span className="rounded-md max-w-12 w-full aspect-square bg-background flex items-center justify-center">
                <Trophy size={22} />
              </span>
              <div className="flex flex-col justify-between gap-1">
                <span className="text-xs font-medium">Leaderboard rank</span>
                <span className="inline-flex items-center align-baseline font-bold text-lg">
                  {(() => {
                    const rank =
                      selectedOption === "week"
                        ? studyStats?.rank.week
                        : selectedOption === "month"
                        ? studyStats?.rank.month
                        : studyStats?.rank.today;

                    switch (rank) {
                      case 1:
                        return (
                          <>
                            <span className="text-yellow-500 mr-1">🥇</span>
                            <span className="text-yellow-500">{`#${rank}`}</span>
                          </>
                        );
                      case 2:
                        return (
                          <>
                            <span className="text-gray-400 mr-1">🥈</span>
                            <span className="text-gray-400">{`#${rank}`}</span>
                          </>
                        );
                      case 3:
                        return (
                          <>
                            <span className="text-amber-600 mr-1">🥉</span>
                            <span className="text-amber-600">{`#${rank}`}</span>
                          </>
                        );
                      default:
                        return (
                          <span className="text-current">{`#${rank}`}</span>
                        );
                    }
                  })()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyStat;
