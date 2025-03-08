"use client"
import React from "react";
import { Button } from "../ui/button";
import { DoorOpen, Undo2, UserRound } from "lucide-react";
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

const Header = () => {

	const router = useRouter()

	// const currentUser = useQuery(createGetCurrentUserInformationQueryOptions())

	// console.log(currentUser)

  return (
    <header className="w-full p-2 bg-white dark:bg-background max-h-12 h-12 sticky top-0 border-b border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center">
        <div className="">

				</div>
        <div className="w-full flex justify-end items-center gap-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/daddy-chill.gif" />
                <AvatarFallback>LD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/daddy-chill.gif" />
                    <AvatarFallback>LD</AvatarFallback>
                  </Avatar>
                  <span className="text-lg">Jack Phat</span>
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
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={"/logout"} className="flex items-center gap-2">
                    <DoorOpen size={16} />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button type="button" onClick={() => router.push("/solo")} size={"sm"}>
            <Undo2 />
            <span>Return to room</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
