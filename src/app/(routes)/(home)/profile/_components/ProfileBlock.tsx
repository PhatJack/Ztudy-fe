"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Separator } from "@/components/ui/separator";
import { AlarmClockMinus, Copy, Edit3, Globe } from "lucide-react";
import React from "react";
import EditProfileDialog from "@/components/profile/edit-profile";
import { useAuthContext } from "@/hooks/useAuthContext";
import { format } from "date-fns";
import Image from "next/image";
import { getMonthlyLevelBorder } from "@/lib/get-border";

const ProfileBlock = () => {
  const [state] = useAuthContext();

  return (
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
      <div className="relative size-[150px] flex justify-center items-center">
        <AvatarCustom
          src={state.user?.avatar}
          className="w-[100px] h-[100px] border"
					alt={state.user?.username}
        />
        <Image
          fill
          priority
          src={getMonthlyLevelBorder(state.user?.monthly_level ?? "MEMBER")}
          alt="border"
          className="pointer-events-none !top-1"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
        />
      </div>
      <div className="w-full flex flex-col items-center space-y-1">
        <span className="text-base font-bold">{state.user?.username}</span>
        <span className="text-xs text-gray-500">{state.user?.email}</span>
        <span className="text-xs text-gray-800">
          Joined {format(state.user?.date_joined ?? new Date(), "MM/dd/yyyy")}
        </span>
      </div>
      <Separator className="bg-gray-200" />
      <div className="w-full flex 2xl:flex-row flex-col justify-between gap-2">
        <div className="w-full p-3 rounded-md bg-input flex gap-2">
          <span className="rounded-md max-w-14 2xl:max-w-12 w-full aspect-square bg-secondary flex items-center justify-center">
            <AlarmClockMinus />
          </span>
          <div className="w-full flex flex-col justify-between gap-1">
            <span className="text-xs font-semibold">Time study</span>
            <span className="text-2xl font-extrabold inline-flex items-center">
              <span>{state.user?.monthly_study_time.toFixed(1)}h</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlock;
