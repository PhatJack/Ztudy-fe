"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Target } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useListGoals } from "@/service/(goal)/list-goals.api";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";
import {
  CreateGoalBodySchema,
  useCreateGoalMutation,
} from "@/service/(goal)/create-goal.api";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "@/components/ui/form";
import toast from "react-hot-toast";
import GoalList from "@/components/goal/goal-list";
import LoadingSpinner from "@/components/loading/loading-spinner";

const tabs: { name: string; value: string }[] = [
  { name: "Open Goals", value: "OPEN" },
  { name: "Completed Goals", value: "COMPLETED" },
];

interface Props {
  user?: CurrentUserResponseSchema;
}

const TodoContainer = ({ user }: Props) => {
  const [currentPageOpen, setCurrentPageOpen] = useState<number>(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"OPEN" | "COMPLETED" | undefined>(
    "COMPLETED"
  );

  const handlePageChange = ({
    page,
    setCurrentPage,
  }: {
    page: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    setCurrentPage(page);
  };
  const onTabChange = (value: string) => {
    setActiveTab(value as "OPEN" | "COMPLETED");
  };
  const createGoalMutation = useCreateGoalMutation();
  const createGoalForm = useForm<CreateGoalBodySchema>({
    defaultValues: {
      goal: "",
      status: "OPEN",
    },
  });
  const goalsOpenListQuery = useQuery({
    ...useListGoals({ user: user?.id, status: "OPEN", page: currentPageOpen }),
    enabled: !!user,
    staleTime: 1000 * 60 * 2,
  });

  const goalsCompletedListQuery = useQuery({
    ...useListGoals({
      user: user?.id,
      status: "COMPLETED",
      page: currentPageCompleted,
    }),
    enabled: !!user,
    staleTime: 1000 * 60 * 2,
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
    <div className="size-full flex xl:justify-between xl:flex-row flex-col gap-6 overflow-hidden">
      <div className="w-full xl:w-3/5 flex flex-col space-y-4">
        <div className="flex items-center gap-2">
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
        </div>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full flex-1 flex flex-col space-y-4 overflow-hidden">
          <TabsList className="w-full p-0 bg-transparent justify-start border-b border-white rounded-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                title={tab.name}
                className={`rounded-none bg-transparent h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold relative inline-block before:block before:h-0 before:content-[attr(title)] before:font-bold before:overflow-hidden before:invisible`}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="OPEN" className="basis-full data-[state=active]:flex flex-col space-y-4 overflow-hidden">
            {goalsOpenListQuery.isLoading && goalsOpenListQuery.isFetching ? (
              <div className="w-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <GoalList
                tab={activeTab}
                goals={goalsOpenListQuery?.data?.results}
                currentPage={currentPageOpen}
                totalPages={goalsOpenListQuery?.data?.totalPages}
                handlePageChange={(page) =>
                  handlePageChange({
                    page,
                    setCurrentPage: setCurrentPageOpen,
                  })
                }
              />
            )}
          </TabsContent>
          <TabsContent value="COMPLETED" className="basis-full data-[state=active]:flex flex-col space-y-4">
            {goalsCompletedListQuery.isLoading &&
            goalsCompletedListQuery.isFetching ? (
              <div className="w-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <GoalList
                tab={activeTab}
                goals={goalsCompletedListQuery?.data?.results}
                currentPage={currentPageCompleted}
                totalPages={goalsCompletedListQuery?.data?.totalPages}
                handlePageChange={(page) =>
                  handlePageChange({
                    page,
                    setCurrentPage: setCurrentPageCompleted,
                  })
                }
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full xl:w-[35%]">
        <div className="w-full flex justify-end">
          <div className="w-full flex gap-2 md:flex-row flex-col">
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-xl font-bold">🎯Goal Stats</p>
              <div className="flex-1 flex gap-2">
                <div className="w-full p-4 bg-background rounded-lg flex items-center gap-4">
                  <div className="size-9 rounded-full bg-accent/10 p-2">
                    <Checkbox disabled className="rounded-full w-5 h-5" />
                  </div>
                  <div className="grid">
                    <span className="text-xs text-muted-foreground">Open</span>
                    <span className="text-3xl font-bold">
                      {goalsOpenListQuery.data?.totalItems}
                    </span>
                  </div>
                </div>
                <div className="w-full p-4 bg-background rounded-lg flex items-center gap-4">
                  <div className="size-9 rounded-full bg-accent/10 p-2">
                    <Checkbox
                      checked
                      disabled
                      className="rounded-full w-5 h-5"
                    />
                  </div>
                  <div className="grid">
                    <span className="text-xs text-muted-foreground">
                      Completed
                    </span>
                    <span className="text-3xl font-bold">
                      {goalsCompletedListQuery.data?.totalItems}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoContainer);
