import { GoalSchema } from "@/lib/schemas/goal/goal.schema";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  PatchGoalBodySchema,
  usePatchGoalMutation,
} from "@/service/(goal)/patch-goal.api";
import toast from "react-hot-toast";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useDeleteGoalMutation } from "@/service/(goal)/delete-goal.api";

interface Props {
  goal: GoalSchema;
  tab: "OPEN" | "COMPLETED" | undefined;
}

const GoalItem = ({ goal, tab }: Props) => {
  const patchGoalMutation = usePatchGoalMutation();
  const deleteGoalMutation = useDeleteGoalMutation();

  const handleGoalStatus = (checked: CheckedState) => {
    if (checked === true) {
      const updatedGoal: PatchGoalBodySchema = {
        id: goal.id,
        status: "COMPLETED",
        goal: goal.goal,
      };
      patchGoalMutation.mutate(updatedGoal, {
        onSuccess() {
          toast.success("Goal status updated successfully!");
        },
      });
    }
  };

  const handleDeleteGoal = () => {
    deleteGoalMutation.mutate(goal.id, {
      onSuccess() {
        toast.success("Goal deleted successfully!");
      },
    });
  };

  return (
    <div className="flex justify-between items-center w-full px-3 py-2 rounded-lg bg-background">
      <div className="flex items-center gap-2 flex-1">
        <Checkbox
          className="rounded-full"
          onCheckedChange={(checked) => handleGoalStatus(checked)}
        />
        <span className="text-xs text-muted-foreground">{goal.goal}</span>
      </div>
      {tab === "OPEN" && (
        <Button
          type="button"
          onClick={handleDeleteGoal}
          size={"icon"}
          variant={"ghost"}
          className="h-8 w-8 hover:bg-transparent hover:text-rose-500"
        >
          <Trash2 />
        </Button>
      )}
    </div>
  );
};

export default React.memo(GoalItem);
