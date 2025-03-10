"use client";
import React from "react";
import { Button } from "../ui/button";
import { DoorOpen, Undo2, UserPen, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createGetCurrentUserInformationQueryOptions } from "@/service/(current-user)/get-current-user-information";
import { deleteCookie } from "cookies-next";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from "@/constants/cookies";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();

  const currentUserQuery = useQuery(
    createGetCurrentUserInformationQueryOptions()
  );

  const currentUser = currentUserQuery.data;

  const handleLogout = () => {
    deleteCookie(COOKIE_KEY_ACCESS_TOKEN);
    deleteCookie(COOKIE_KEY_REFRESH_TOKEN);
    router.push("/login");
    toast.success("Logged out successfully");
  };

  return (
    <header className="w-full p-2 bg-white dark:bg-background max-h-12 h-12 sticky top-0 border-b border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center">
        <div className=""></div>
        <div className="w-full flex justify-end items-center gap-4">
          {currentUserQuery.isLoading ? (
            <div className="size-8 rounded-full bg-gray-300 animate-pulse"></div>
          ) : null}
          {currentUserQuery.isSuccess ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src="/daddy-chill.gif" />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          currentUser?.avatar
                            ? currentUser?.avatar
                            : "/daddy-chill.gif"
                        }
                      />
                      <AvatarFallback>LD</AvatarFallback>
                    </Avatar>
                    <span className="text-lg">{currentUser?.username}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"/profile"} className="flex items-center gap-2">
                      <UserRound size={16} />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/profile"} className="flex items-center gap-2">
                      <UserPen size={16} />
                      <span>Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <DoorOpen size={16} />
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <Button
            type="button"
            onClick={() => router.push("/solo")}
            size={"sm"}
          >
            <Undo2 />
            <span>Return to room</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
