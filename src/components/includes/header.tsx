"use client";
import React, { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { createGetCurrentUserInformationQueryOptions } from "@/service/(current-user)/get-current-user-information.api";
import toast from "react-hot-toast";
import { useLogoutMutation } from "@/service/(auth)/logout.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import HeaderStats from "./components/header-stats";
import HeaderMobileMenu from "./components/header-mobile-menu";
import AvatarCustom from "../avatar/AvatarCustom";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";

const Header = () => {
  const { disconnectOnlineSocket } = useOnlineWebSocket();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();
  const [, dispatch] = useAuthContext();

  const currentUserQuery = useQuery(
    createGetCurrentUserInformationQueryOptions()
  );

  const currentUser = currentUserQuery.data;

  const handleLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          disconnectOnlineSocket();
          dispatch({ type: "SET_USER", payload: null });
          router.push("/login");
          toast.success("Logged out successfully");
        },
      }
    );
  };

  return (
    <header className="w-full px-4 py-2 bg-white dark:bg-background max-h-14 h-14 sticky top-0 border-b border-gray-200 shadow-sm z-[40]">
      <div className="w-full flex justify-between items-center">
        <div className="w-full">
          <div className="md:block hidden">
            <HeaderStats />
          </div>
          <div className="md:hidden block">
            <HeaderMobileMenu />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          {currentUserQuery.isLoading ? (
            <div className="size-8 rounded-full bg-gray-300 animate-pulse"></div>
          ) : null}
          {currentUserQuery.isSuccess ? (
            <DropdownMenu
              modal={false}
              open={openModal}
              onOpenChange={setOpenModal}
            >
              <DropdownMenuTrigger>
                <AvatarCustom
                  src={currentUser?.avatar}
                  className="w-9 h-9 cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          currentUser?.avatar
                            ? currentUser?.avatar
                            : "/default.png"
                        }
                      />
                      <AvatarFallback>LD</AvatarFallback>
                    </Avatar>
                    <span className="text-lg">{currentUser?.username}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => {
                      router.push("/profile");
                      setOpenModal(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <UserRound size={16} />
                      <span>Profile</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={handleLogout}>
                    <span className="flex items-center gap-2 cursor-pointer">
                      <DoorOpen size={16} />
                      <span>Logout</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <Button
            type="button"
            onClick={() => router.push("/solo")}
            size={"sm"}
            className="md:inline-flex hidden"
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
