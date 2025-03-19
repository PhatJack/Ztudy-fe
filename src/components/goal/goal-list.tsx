"use client";
import { GoalSchema } from "@/lib/schemas/goal/goal.schema";
import React from "react";
import GoalItem from "./goal-item";
import PaginationCustom from "../pagination/PaginationCustom";

interface Props {
  tab: "OPEN" | "COMPLETED" | undefined;
  goals: GoalSchema[] | undefined;
  currentPage: number;
  totalPages: number | undefined;
  handlePageChange: (page: number) => void;
}

const GoalList = ({
  tab,
  goals,
  currentPage,
  handlePageChange,
  totalPages,
}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      {tab === "COMPLETED" && (
        <p className="font-bold">Your completed goals! 👏</p>
      )}
      <div className="flex flex-col gap-2">
        {goals?.length === 0 ? (
          <div className="w-full h-[200px] flex flex-col justify-center items-center">
            <p className="text-lg font-bold">
              No {tab === "COMPLETED" && "completed"} goals found!
            </p>
            <p className="text-sm text-muted-foreground">
              Create a goal to boost your productivity!
            </p>
          </div>
        ) : null}
        {goals?.map((goal, _) => (
          <GoalItem goal={goal} key={goal.id} />
        ))}
      </div>
      <PaginationCustom
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default React.memo(GoalList);
