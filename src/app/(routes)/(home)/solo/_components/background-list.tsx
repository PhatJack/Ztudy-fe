"use client";
import BackgroundContainer from "@/components/solo/background-list/background-container";
import YoutubeLinkInput from "@/components/solo/background-list/youtube-link-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpenDot, Heart } from "lucide-react";
import React, { useState } from "react";
import UserFavoriteVideos from "./user-favorite-videos";
const BackgroundList = () => {
  const [activeTab, setActiveTab] = useState<"default" | "favorite">("default");
  const onTabChange = (value: string) => {
    setActiveTab(value as "default" | "favorite");
  };
  return (
    <div className="w-[280px] min-w-[280px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        defaultValue="default"
        className="w-full"
      >
        <TabsList className="bg-background w-full mb-3 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
          <TabsTrigger
            value="default"
            className="w-full gap-2 data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            <FolderOpenDot
              size={20}
              className="fill-amber-400 stroke-gray-200 dark:stroke-background"
            />
            {/* Default */}
          </TabsTrigger>
          <TabsTrigger
            value="favorite"
            className="w-full gap-2 data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            <Heart
              className="fill-rose-600 stroke-gray-200 dark:stroke-background"
              size={20}
            />
            {/* Favorite */}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="default" className="flex flex-col gap-3 mt-0">
          <BackgroundContainer />
        </TabsContent>
        <TabsContent value="favorite" className="mt-0">
          <p className="text-muted-foreground text-xs italic mb-3">
            You can add your favorite video here.
          </p>
          <UserFavoriteVideos />
        </TabsContent>
      </Tabs>
      <YoutubeLinkInput />
    </div>
  );
};

export default React.memo(BackgroundList);
