import AvatarCustom from "@/components/avatar/AvatarCustom";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { AlarmClockMinus, Copy, Edit3, Trophy } from "lucide-react";
import React from "react";
import ChangePassword from "./ChangePassword";
import { Separator } from "@/components/ui/separator";
import EditProfileDialog from "@/components/profile/edit-profile";
import { Dialog } from "@/components/ui/dialog";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <div className="w-full rounded-xl bg-background flex flex-col items-center space-y-4 p-6">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm font-bold">Profile</span>
              <div className="flex gap-4">
                <EditProfileDialog>
                  <span className="cursor-pointer">
                    <Edit3 size={16} />
                  </span>
                </EditProfileDialog>
                <TooltipTemplate content="Copy profile url">
                  <span className="cursor-pointer">
                    <Copy size={16} />
                  </span>
                </TooltipTemplate>
              </div>
            </div>
            <AvatarCustom
              src="/default-avatar.jpg"
              className="w-24 h-24 border"
            />
            <div className="w-full flex flex-col items-center space-y-1">
              <span className="text-base font-bold">John Doe</span>
              <span className="text-xs text-gray-500">@johndoe</span>
              <span className="text-xs text-gray-800">Joined 17/03/2025</span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="w-full flex 2xl:flex-row flex-col justify-between gap-2">
              <div className="w-full p-3 rounded-md bg-input flex gap-2">
                <span className="rounded-md max-w-12 w-full aspect-square bg-secondary flex items-center justify-center">
                  <Trophy className="text-secondary-foreground" />
                </span>
                <div className="w-full flex flex-col justify-between gap-1">
                  <span className="text-xs font-medium">Leaderboard rank</span>
                  <span className="text-xl font-extrabold text-yellow-500 inline-flex items-center">
                    <span>#1</span>
                    <span className="pb-1">👑</span>
                  </span>
                </div>
              </div>
              <div className="w-full p-3 rounded-md bg-input flex gap-2">
                <span className="rounded-md max-w-12 w-full aspect-square bg-secondary flex items-center justify-center">
                  <AlarmClockMinus />
                </span>
                <div className="w-full flex flex-col justify-between gap-1">
                  <span className="text-xs font-medium">Time study</span>
                  <span className="text-xl font-extrabold inline-flex items-center">
                    <span>1.2h</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ChangePassword />
        </div>
        <div className="xl:col-span-6">
          <div className="w-full rounded-xl bg-background p-6"></div>
        </div>
        <div className="xl:col-span-3">
          <div className="w-full rounded-xl bg-background p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
