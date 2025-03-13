import React, { Suspense } from "react";
import ZtudyCommunity from "./ZtudyCommunity";
import LoadingSpinner from "@/components/loading/loading-spinner";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { Plus, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs: { name: string; value: string }[] = [
  { name: "Open Goals", value: "openGoals" },
  { name: "Completed Goals", value: "completedGoals" },
];

const DashboardPage = () => {
  return (
    <div className="relative flex h-[calc(100vh-3rem)]">
      <div className="flex-1 flex justify-center lg:py-10 lg:px-6 px-4 pt-10 w-full">
        <div className="lg:max-w-[1000px] w-full flex flex-col space-y-6">
          <div className="w-full flex lg:flex-row flex-col justify-between items-center lg:gap-0 gap-6">
            <div className="flex lg:flex-row flex-col items-center gap-2">
              <AvatarCustom src="/daddy-chill.gif" className="w-12 h-12" />
              <div className="lg:text-left text-center">
                <h1 className="font-medium text-muted-foreground">
                  Hello, John!
                </h1>
                <p className="font-bold text-3xl lg:text-2xl leading-6 font-sans">
                  Welcome back to Ztudy!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 w-fit px-2 py-1 rounded-full bg-white text-sm">
              <span className="size-2 bg-emerald-400 animate-pulse-custom rounded-full"></span>
              <span>
                <strong>22472</strong> online
              </span>
            </div>
          </div>
          <div className="w-full flex lg:justify-between lg:flex-row flex-col gap-6">
            <div className="w-full lg:w-3/5 flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white py-2 pl-9 pr-2 rounded-xl border-2 border-primary relative h-auto">
                  <span className="absolute top-1/5 left-3">
                    <Target className="text-rose-600" />
                  </span>
                  <Input
                    className="shadow-none border-none focus-visible:ring-0 h-6"
                    placeholder="Type a goal..."
                  />
                </div>
                <Button size={"icon"} className="h-10 w-10" disabled>
                  <Plus />
                </Button>
              </div>
              <div className="w-full">
                <Tabs defaultValue="openGoals" className="w-full">
                  <TabsList className="w-full p-0 bg-transparent justify-start border-b border-white rounded-none">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
												title={tab.name}
                        className={`rounded-none bg-transparent h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold relative inline-block before:block before:h-0 before:content-[attr(title)] before:font-bold before:overflow-hidden before:invisible`}>
                        {tab.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="openGoals">
                    Make changes to your account here.
                  </TabsContent>
                  <TabsContent value="completedGoals">
                    <div className="flex flex-col space-y-2">
											<p className="font-bold">Your completed goals! 👏</p>
										</div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-full lg:w-1/5"></div>
          </div>
        </div>
      </div>
      <div className="max-w-[270px] w-[270px] h-full bg-white dark:bg-background hidden flex-col gap-2 p-4 lg:flex">
        <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">
          Ztudy Community
        </h5>
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          }
        >
          <ZtudyCommunity />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
