"use client";
import {
  CreateGoalBodySchema,
  useCreateGoalMutation,
} from "@/service/(goal)/create-goal.api";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, FormControl, FormField } from "../ui/form";
import { Plus, Target } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";

interface Props {
  user?: CurrentUserResponseSchema;
}

const AddTodoForm = ({ user }: Props) => {
  const createGoalMutation = useCreateGoalMutation();
  const createGoalForm = useForm<CreateGoalBodySchema>({
    defaultValues: {
      goal: "",
      status: "OPEN",
    },
  });

  const onSubmit = (data: CreateGoalBodySchema) => {
    const newData = { ...data, user: user?.id };
    createGoalMutation.mutate(newData, {
      onSuccess() {
        toast.success("Goal created successfully!");
        createGoalForm.reset();
      },
      onError(error) {
        console.log(error);
        toast.error("Failed to create goal!");
      },
    });
  };

  return (
    <Form {...createGoalForm}>
      <form
        onSubmit={createGoalForm.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
        <FormField
          control={createGoalForm.control}
          name="goal"
          render={({ field }) => (
            <FormControl>
              <div className="flex-1 bg-background py-2 pl-9 pr-2 rounded-xl border-2 border-primary relative h-auto">
                <span className="absolute top-1/5 left-3">
                  <Target className="text-rose-600" />
                </span>
                <Input
                  {...field}
                  disabled={createGoalMutation.isPending}
                  className="shadow-none border-none focus-visible:ring-0 h-6 bg-transparent"
                  placeholder="Type a goal..."
                />
              </div>
            </FormControl>
          )}
        />
        <Button
          size={"icon"}
          className="h-10 w-10"
          disabled={!createGoalForm.watch("goal")}
        >
          <Plus />
        </Button>
      </form>
    </Form>
  );
};

export default React.memo(AddTodoForm);
