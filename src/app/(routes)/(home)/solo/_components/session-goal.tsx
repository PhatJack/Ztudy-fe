"use client";

import AddTodoForm from "@/components/form/AddTodoForm";
import GoalItem from "@/components/goal/goal-item";
import LoadingSpinner from "@/components/loading/loading-spinner";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { useSoloContext } from "@/hooks/useSoloContext";
import { createGetCurrentUserInformationQuery } from "@/service/(current-user)/get-current-user-information.api";
import { useInfiniteListGoals } from "@/service/(goal)/list-goals.api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { OctagonAlert, Target, X } from "lucide-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SessionGoal = () => {
  const { ref, inView } = useInView();
  const currentUserQuery = useQuery(createGetCurrentUserInformationQuery());
  const userId = currentUserQuery.data?.id;

  const { data, isFetching, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...useInfiniteListGoals({ user: userId }),
      placeholderData: (previousData, previousQuery) => previousData,
    });

  const [, dispatch] = useSoloContext();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="bg-background text-foreground p-5 rounded-md w-[280px] min-w-[280px] h-fit flex flex-col space-y-4 shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-xs inline-flex items-center gap-1">
          <Target size={14} />
          <strong>Session Goal</strong>
        </span>
        <div className="flex items-center gap-2">
          <TooltipTemplate
            variant={"accent"}
            content={
              "Supercharge your focus by setting clear, bite-sized goals for each work session. Instead of “finish project,” try “draft 500 words” or “review 3 pages.” Pair it with a timer (like 25 minutes) to keep momentum. Small wins stack up—define your target, crush it, and watch progress soar!"
            }
          >
            <span className="cursor-pointer">
              <OctagonAlert size={16} />
            </span>
          </TooltipTemplate>
          <span
            onClick={() =>
              dispatch({ type: "TOGGLE_BUTTON", payload: "isOpenSessionGoal" })
            }
          >
            <X size={16} />
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <AddTodoForm
          user={currentUserQuery.data}
          isDisplayIcon={false}
          className="border p-2"
        />
        <div className="flex flex-col overflow-hidden">
          <div className="max-h-[250px] overflow-y-auto flex flex-col">
            {data &&
              data.results.map((goal) => (
                <GoalItem goal={goal} key={goal.id} className="p-0" />
              ))}
            {
              <div ref={ref} className="text-center w-full text-sm">
                {isFetchingNextPage ? <LoadingSpinner /> : ""}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SessionGoal);
