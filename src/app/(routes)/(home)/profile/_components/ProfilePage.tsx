import AvatarCustom from "@/components/avatar/AvatarCustom";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Copy } from "lucide-react";
import React from "react";
import ChangePassword from "./ChangePassword";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <div className="w-full grid xl:grid-cols-12 gap-6">
        <div className="col-span-3 flex flex-col space-y-6">
          <div className="w-full rounded-xl bg-input flex flex-col items-center space-y-2 p-6">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm font-bold">Profile</span>
              <TooltipTemplate content="Copy profile url">
                <span className="cursor-pointer">
                  <Copy size={16} />
                </span>
              </TooltipTemplate>
            </div>
            <AvatarCustom src="/default-avatar.jpg" className="w-24 h-24" />
            <div className="w-full flex flex-col items-center space-y-1">
              <span className="text-sm font-bold">John Doe</span>
              <span className="text-xs text-gray-500">@johndoe</span>
              <span className="text-xs text-gray-800">Joined 17/03/2025</span>
            </div>
          </div>
          <ChangePassword />
        </div>
        <div className="xl:col-span-6">
          <div className="w-full rounded-xl bg-input p-6"></div>
        </div>
        <div className="col-span-3">
          <div className="w-full rounded-xl bg-input p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
