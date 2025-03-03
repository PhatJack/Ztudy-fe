"use client";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React from "react";

const LeaderboardPage = () => {
  return (
    <div className="p-6">
      <div className="w-full p-6 bg-white dark:bg-muted/40 rounded-md flex flex-col space-y-2">
        <div className="w-full flex justify-between items-center">
          <p className="flex items-center gap-1">
            <span className="font-semibold text-black dark:text-white">Leaderboard</span>
            <span className="text-xs">Global board</span>
          </p>
          <div className="flex gap-2 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="friend-only"
                className="data-[state=unchecked]:bg-gray-500"
              />
              <Label htmlFor="friend-only">Friends only</Label>
            </div>
          </div>
        </div>
        <Separator />
        <div className="">
          <p className="text-sm">
            The monthly leaderboard will be reset in{" "}
            <span className="font-semibold underline">29 days</span>
          </p>
        </div>
        <Input
          className="border-2 border-muted h-10 py-2"
          placeholder="Search for a user"
        />
        <table className="table">
          <thead>
            <tr className="[&_th]:p-4 text-left text-sm border-b border-gray-200">
              <th className="w-[5%] text-left">Rank</th>
              <th className="w-full text-left">User</th>
              <th className="w-[20%] text-right">Hour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="[&_td]:p-4">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/daddy-chill.gif" alt="avatar" />
                      <AvatarFallback>ZT</AvatarFallback>
                    </Avatar>
                    <span>
                      <strong>John Doe</strong>
                    </span>
                  </div>
                </td>
                <td>100</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationCustom
          onPageChange={() => {}}
          currentPage={1}
          totalPages={5}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
