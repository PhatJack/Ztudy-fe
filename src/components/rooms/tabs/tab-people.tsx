import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const TabPeople = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-[65px] border-b bg-white p-4 shadow-lg">
        <Input type="text" placeholder="Search people" />
      </div>
      <div className="overflow-y-auto flex flex-col space-y-4 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <span className="font-semibold">User {index}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size={"icon"}
                className="rounded-full bg-emerald-600 text-white"
              >
                456
              </Button>
              <Button
                size={"icon"}
                className="rounded-full bg-rose-600 text-white"
              >
                123
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPeople;
