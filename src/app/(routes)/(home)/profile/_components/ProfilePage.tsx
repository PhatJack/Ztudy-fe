import React from "react";
import ChangePassword from "./ChangePassword";
import ProfileBlock from "./ProfileBlock";
import MonthlyLevel from "./MonthlyLevel";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <ProfileBlock />
          <ChangePassword />
        </div>
        <div className="xl:col-span-6">
          <div className="w-full rounded-xl bg-background p-6"></div>
        </div>
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <MonthlyLevel />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
