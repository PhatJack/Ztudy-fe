"use client";

import LoadingSpinner from "@/components/loading/loading-spinner";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSoloContext } from "@/hooks/useSoloContext";
import { createGetCurrentUserInformationQuery } from "@/service/(current-user)/get-current-user-information.api";
import {
  CreateGoalBodySchema,
  useCreateGoalMutation,
} from "@/service/(goal)/create-goal.api";
import { useListGoals } from "@/service/(goal)/list-goals.api";
import { useQuery } from "@tanstack/react-query";
import { OctagonAlert, Plus, Target, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SessionGoal = () => {
  const currentUserQuery = useQuery(
    createGetCurrentUserInformationQuery()
  );
  const userId = currentUserQuery.data?.id;
  const createGoalMutation = useCreateGoalMutation();

  // const goalsQuery = useQuery(useListGoals({user: userId}));

	// const goals = goalsQuery.data?.results;

  const [, dispatch] = useSoloContext();

  const goalForm = useForm<CreateGoalBodySchema>({
    defaultValues: {
      goal: "",
      status: "OPEN",
    },
  });

  const onGoalSubmit = goalForm.handleSubmit((data: CreateGoalBodySchema) => {
    const formData = {
      ...data,
      user_id: currentUserQuery.data?.id,
    };

    createGoalMutation.mutate(formData, {
      onSuccess: () => {
        goalForm.reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create goal");
      },
    });
  });

  return (
    <div className="bg-background text-foreground p-5 rounded-md w-[267px] min-w-[267px] h-fit flex flex-col space-y-4 shadow-lg">
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
      <Form {...goalForm}>
        <form onSubmit={onGoalSubmit} className="flex gap-2">
          <FormField
            control={goalForm.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    disabled={
                      goalForm.formState.isSubmitting ||
                      !goalForm.formState.isValid ||
                      !goalForm.formState.isDirty
                    }
                    className="bg-white dark:bg-black border-2 border-gray-200"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size={"icon"}
            variant={"secondary"}
            disabled={
              goalForm.formState.isSubmitting ||
              !goalForm.formState.isValid ||
              !goalForm.formState.isDirty
            }
          >
            <Plus />
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-3">
        {/* {goalsQuery.isLoading ? (
          <div className="h-[200px] w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : null}
        {goals &&
          goals.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <Checkbox
                id={`goal${index}`}
                className="rounded-full"
                checked={item.status === "COMPLETED" ? true : false}
              />
              <Label
                htmlFor={`goal${index}`}
                className="peer-data-[state=checked]:line-through"
              >
                {item.title}
              </Label>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default React.memo(SessionGoal);
