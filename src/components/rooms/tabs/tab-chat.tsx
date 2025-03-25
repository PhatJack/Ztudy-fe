import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import React from "react";

const TabChat = () => {
  return (
    <>
      <div className="p-4 h-full">
        <div className="overflow-y-auto flex flex-col space-y-4 pe-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">User {index}</span>
                <span className="text-xs">{format(new Date(), "p")}</span>
              </div>
              <div className="w-full h-auto rounded-md">
                In ut adipisicing aliqua qui officia.Nulla consectetur
                exercitation nisi esse quis cillum adipisicing do mollit cillum
                exercitation est.
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-background">
        <div className="flex items-center gap-2">
          <Input type="text" placeholder="Type a message..." />
          <Button size={"icon"} className="bg-primary text-white">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TabChat;
