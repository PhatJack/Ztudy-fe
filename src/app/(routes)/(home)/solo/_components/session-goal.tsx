"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateGoalBodySchema } from "@/service/(goal)/create-goal.api";
import { CircleAlert, Plus, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const SessionGoal = () => {
  const goalForm = useForm<CreateGoalBodySchema>({
    defaultValues: {
      title: "",
    },
  });

  const onGoalSubmit = goalForm.handleSubmit((data: CreateGoalBodySchema) => {
    console.log(data);
  });

  return (
    <div className="bg-background text-foreground p-4 rounded-md w-fit h-fit flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-xs">
          <strong>Session Goal</strong>
        </span>
        <div className="flex gap-1">
          <span className="cursor-pointer">
            <CircleAlert size={16} />
          </span>
          <span>
            <X size={16} />
          </span>
        </div>
      </div>
      <Form {...goalForm}>
        <form onSubmit={onGoalSubmit} className="flex gap-2">
          <FormField
            control={goalForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
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
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-1">
            <Checkbox id={`goal${index}`} className="rounded-full" />
            <Label
              htmlFor={`goal${index}`}
              className="peer-data-[state=checked]:line-through"
            >
              This is a goal
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SessionGoal);
