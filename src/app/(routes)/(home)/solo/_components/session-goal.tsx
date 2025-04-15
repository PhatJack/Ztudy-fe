"use client";

import AddTodoForm from "@/components/form/AddTodoForm";
import GoalItem from "@/components/goal/goal-item";
import LoadingSpinner from "@/components/loading/loading-spinner";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSoloContext } from "@/hooks/useSoloContext";
import { GoalSchema } from "@/lib/schemas/goal/goal.schema";
import { useInfiniteListGoals } from "@/service/(goal)/list-goals.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OctagonAlert, Target, X } from "lucide-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SessionGoal = () => {
  const { ref, inView } = useInView();
  const [stateAuth,] = useAuthContext();
  const [state, dispatch] = useSoloContext();
  const userId = stateAuth.user?.id;

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...useInfiniteListGoals({ user: userId, status: "OPEN" }),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      dispatch({ type: "SAVE_OPEN_GOALS", payload: data?.results.length });
    }
  }, [fetchNextPage, inView]);

  // Calculate and save total goals whenever open or completed goals change
  useEffect(() => {
    dispatch({ type: "SAVE_OPEN_GOALS", payload: data?.results.length });
  }, [data?.results.length, dispatch]);

  const handleGoalComplete = (goal: GoalSchema) => {
    dispatch({ type: "SAVE_COMPLETED_GOALS", payload: goal });
  };

  return (
    <div className="bg-background text-foreground p-5 rounded-md w-full h-fit flex flex-col space-y-4 shadow-lg">
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
						className="cursor-pointer"
          >
            <X size={16} />
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <AddTodoForm
          user={stateAuth.user}
          isDisplayIcon={false}
          className="border p-2"
        />
        <div className="flex flex-col overflow-hidden">
          <div className="max-h-[250px] overflow-y-auto pe-2 flex flex-col gap-1">
            {data &&
              data.results.map((goal) => (
                <GoalItem
                  goal={goal}
                  key={goal.id}
                  className="bg-gray-100 dark:bg-gray-900	py-1"
                  onComplete={handleGoalComplete}
                />
              ))}
            {/* Completed goals for current session */}
            {state?.completedGoals.length > 0 &&
              state.completedGoals.map((goal) => (
                <div
                  key={`completed-${goal.id}`}
                  className="bg-gray-100 dark:bg-gray-900 p-3 flex gap-2 rounded-lg"
                >
                  <Checkbox className="rounded-full" disabled defaultChecked />
                  <span className="text-xs line-through">{goal.goal}</span>
                </div>
              ))}
            {
              <div ref={ref} className="text-center w-full text-xs">
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
