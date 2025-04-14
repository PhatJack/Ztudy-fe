import dynamic from "next/dynamic";

const ProfileBlock = dynamic(() => import("./ProfileBlock"));
const ChangePassword = dynamic(() => import("./ChangePassword"));
const MonthlyLevel = dynamic(() => import("./MonthlyLevel"));
const ChartBlock = dynamic(() => import("./ChartBlock"));

const ProfilePage = () => {
  return (
    <div className="p-6">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <ProfileBlock />
        </div>
        <div className="xl:col-span-6">
          <div className="w-full rounded-xl bg-background p-6">
            <ChartBlock />
          </div>
        </div>
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <MonthlyLevel />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
