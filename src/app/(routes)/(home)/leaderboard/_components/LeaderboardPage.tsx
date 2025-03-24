"use client";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useListLeaderboardApi } from "@/service/(leaderboard)/list-leaderboard.api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { format } from "date-fns";

const LeaderboardPage = () => {
  const [period, setPeriod] = useState<"month" | "day" | "week">("month");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const listLeaderboardQuery = useQuery(
    useListLeaderboardApi(period, { page: currentPage })
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

  return (
    <div className="p-6">
      <div className="w-full h-full p-6 bg-white dark:bg-muted/40 rounded-md flex flex-col space-y-2">
        <div className="w-full flex justify-between items-center">
          <p className="flex items-center gap-1">
            <span className="font-semibold text-black dark:text-white">
              Leaderboard
            </span>
            <span className="text-xs">Global board</span>
          </p>
        </div>
        <Separator />
        <div className="w-full flex justify-between items-center text-sm">
          <p className="h-fit">
            The monthly leaderboard will be reset every{" "}
            <span className="font-semibold underline">30 minutes</span>
          </p>
          <div className="flex items-center gap-2">
            <p>
              Last Update:{" "}
              <span className="font-bold">
								{
									format(listLeaderboardQuery.dataUpdatedAt, "mm-dd-yyyy, h:mm:ss a")
								}
              </span>
            </p>
            <Button
              type="button"
              size={"icon"}
              onClick={() => listLeaderboardQuery.refetch()}
              className="peer"
            >
              <RotateCcw className="peer-active:animate-spin" />
            </Button>
          </div>
        </div>
        {listLeaderboardQuery.data?.message ? (
          <p className="text-center !my-6 text-destructive">
            {listLeaderboardQuery.data.message}
          </p>
        ) : (
          <>
            <table className="table h-full">
              <thead>
                <tr className="[&_th]:p-4 text-left text-sm border-b border-gray-200">
                  <th className="w-[5%] text-left">Rank</th>
                  <th className="w-full text-left">User</th>
                  <th className="w-[20%] text-right">Hour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listLeaderboardQuery.isLoading &&
                listLeaderboardQuery.isFetching ? (
                  <tr>
                    <td colSpan={3} className="py-4">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : (
                  listLeaderboardQuery.data?.leaderboard?.results.map(
                    (user, index) => (
                      <tr key={index} className="[&_td]:py-2.5 [&_td]:px-4">
                        <td>{user.rank}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={user.avatar ? user.avatar : "/default.png"}
                                alt="avatar"
                              />
                              <AvatarFallback>ZT</AvatarFallback>
                            </Avatar>
                            <span>
                              <strong>{user.username}</strong>
                            </span>
                          </div>
                        </td>
                        <td>{user.total_time}h</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
            <PaginationCustom
              onPageChange={(page) =>
                handlePageChange({ page, setCurrentPage })
              }
              currentPage={currentPage}
              totalPages={listLeaderboardQuery?.data?.leaderboard?.totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
