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

const Header = () => {
  return (
    <header className="w-full p-2 bg-white dark:bg-background max-h-12 h-12 sticky top-0 border-b border-gray-200">
      <div className="w-full flex justify-between items-center">
        <div className=""></div>
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
                  <div className="flex items-center gap-2">
                    <UserRound size={16} />
                    <span>Profile</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <DoorOpen size={16} />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size={"sm"}>
            <Undo2 />
            <span>Return to room</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
