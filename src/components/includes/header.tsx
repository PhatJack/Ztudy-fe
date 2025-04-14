"use client";
import React, { useState } from "react";
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
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
import { useLogoutMutation } from "@/service/(auth)/logout.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import HeaderStats from "./components/header-stats";
import HeaderMobileMenu from "./components/header-mobile-menu";
import AvatarCustom from "../avatar/AvatarCustom";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const { disconnectOnlineSocket } = useOnlineWebSocket();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();
  const [state, dispatch] = useAuthContext();

  const handleLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          deleteCookie("isLoggedIn", { secure: true, sameSite: "lax" });
          disconnectOnlineSocket();
          dispatch({ type: "SET_USER", payload: null });
          router.push("/login");
          toast.success("Logged out successfully");
        },
      }
    );
  };

  return (
    <header className="w-full px-4 py-2 bg-white dark:bg-background max-h-14 h-14 sticky top-0 border-b shadow-sm z-[40]">
      <div className="w-full flex justify-between items-center">
        <div className="w-full">
          <div className="md:block hidden">
            <HeaderStats user={state.user} />
          </div>
          <div className="md:hidden block">
            <HeaderMobileMenu />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <DropdownMenu
            modal={false}
            open={openModal}
            onOpenChange={setOpenModal}
          >
            <DropdownMenuTrigger>
              <AvatarCustom
                src={state.user?.avatar}
                className="w-9 h-9 cursor-pointer border"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <AvatarCustom
                    src={state.user?.avatar}
                    className="cursor-pointer"
                  />
                  <span className="text-lg">{state.user?.username}</span>
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
