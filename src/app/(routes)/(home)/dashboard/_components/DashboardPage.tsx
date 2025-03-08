import AvatarCustom from "@/components/avatar/AvatarCustom";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="relative flex h-[calc(100vh-3rem)]">
      <div className="flex-1 flex justify-center lg:py-10 lg:px-6 p-2 w-full">
				<div className="lg:max-w-[1000px] border w-full">
					
				</div>
			</div>
      <div className="max-w-[270px] w-[270px] h-full bg-white dark:bg-background hidden flex-col gap-2 p-4 lg:flex">
        <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">Ztudy Community</h5>
				<div className="flex flex-col space-y-2 divide-y divide-background dark:divide-input">
					{
						Array.from({length: 10}).map((_, index) => (
						<div key={index} className="flex space-x-2 items-center pt-2 px-2">
							<AvatarCustom className="rounded-lg w-9 h-9" src="/daddy-chill.gif" />
							<span className="text-sm">
								Daddy Chill
							</span>
						</div>
						))
					}
				</div>
      </div>
    </div>
  );
};

export default DashboardPage;
