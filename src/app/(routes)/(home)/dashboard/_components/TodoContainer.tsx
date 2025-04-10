"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useListGoals } from "@/service/(goal)/list-goals.api";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";
import GoalList from "@/components/goal/goal-list";
import LoadingSpinner from "@/components/loading/loading-spinner";
import AddTodoForm from "@/components/form/AddTodoForm";
import { ArrowUpToLine, DollarSign, PencilLine, Plus } from "lucide-react";
import Image from "next/image";

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
    "OPEN"
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

  return (
    <div className="size-full flex xl:justify-between xl:flex-row flex-col gap-6 overflow-hidden">
      <div className="w-full xl:w-3/5 flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <AddTodoForm user={user} />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full flex-1 flex flex-col space-y-4 overflow-hidden"
        >
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
          <TabsContent
            value="OPEN"
            className="basis-full data-[state=active]:flex flex-col space-y-4 overflow-hidden"
          >
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
          <TabsContent
            value="COMPLETED"
            className="basis-full data-[state=active]:flex flex-col space-y-4"
          >
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
        <div className="w-full flex flex-col gap-3 justify-end">
          <div className="w-full flex gap-3 md:flex-row flex-col">
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-xl font-bold">🎯Goal Stats</p>
              <div className="flex-1 flex gap-3">
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

          {/* Why Goal Setting Section */}
          <div className="w-full p-6 bg-background rounded-lg relative overflow-hidden">
            <Image
              src={"/why-goal-setting.jpg"}
              alt="background"
              className="object-cover rotate-180 opacity-60"
              fill
            />
            <h3 className="text-2xl font-bold mb-3 relative z-10">
              🎯 Why Goal Setting?
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-3">
                <div className="min-w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <DollarSign size={18} className="text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">Motivation & Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Goals give you direction and help maintain motivation
                    through challenging tasks.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="min-w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <ArrowUpToLine size={18} className="text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">Track Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracking progress helps you stay accountable and visualize
                    your journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="min-w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <Plus size={18} className="text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">Break Down Big Tasks</h4>
                  <p className="text-sm text-muted-foreground">
                    Goals help divide large projects into manageable chunks,
                    reducing overwhelm.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="min-w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <PencilLine size={18} className="text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">Clarity & Direction</h4>
                  <p className="text-sm text-muted-foreground">
                    Setting clear goals helps you prioritize and make better
                    decisions about your time.
                  </p>
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
