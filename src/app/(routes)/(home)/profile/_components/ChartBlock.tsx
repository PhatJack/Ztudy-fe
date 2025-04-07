"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  StudyTimeChartFilter,
  useStatStudyTimeChart,
} from "@/service/(stats)/stat-study-time-chart.api";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

const chartConfig = {
  studyTime: {
    label: "Study Time",
    color: "#2563eb",
  },
} satisfies ChartConfig;

// Format date as "Thursday, April 7th, 2025"
const formatDate = (dateStr: string) => {
  try {
    const date = parseISO(dateStr);
    return format(date, "EEEE, MMMM do, yyyy");
  } catch (error) {
    return dateStr;
  }
};

// Custom tooltip content component
const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const studyTimeHours = payload[0].value

  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-1 gap-2">
        <div className="font-semibold text-sm">{formatDate(label)}</div>
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div>
            Study time: {studyTimeHours.toFixed(1)} hour
            {studyTimeHours !== "1.00" ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

function ChartBlock() {
  const [selectedOption, setSelectedOption] =
    useState<StudyTimeChartFilter>("today");

  const studyTimeChartQuery = useQuery(useStatStudyTimeChart(selectedOption));

  // Transform API data for the chart
  const chartData = studyTimeChartQuery.data?.data
    ? studyTimeChartQuery.data.data
    : [];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <p>
          <strong className="mr-1 text-sm">Performance</strong>
          <span className="text-xs">Time spent in study rooms</span>
        </p>
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value as StudyTimeChartFilter);
          }}
        >
          <SelectTrigger className="w-[120px] bg-background border-gray-400">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this_week">This week</SelectItem>
            <SelectItem value="this_month">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {studyTimeChartQuery.isLoading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : studyTimeChartQuery.isError ? (
        <div className="text-center py-8 text-destructive">
          Failed to load chart data
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                dataKey="total_study"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<CustomTooltipContent />} />
              <Bar
                dataKey="total_study"
                fill="hsl(var(--chart-4))"
                radius={4}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  );
}

export default ChartBlock;
