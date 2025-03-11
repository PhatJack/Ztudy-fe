import BackgroundContainer from "@/components/solo/background-list/background-container";
import YoutubeLinkInput from "@/components/solo/background-list/youtube-link-input";
import React from "react";
const BackgroundList = () => {
  return (
    <div className="w-[267px] min-w-[267px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-4">
      <BackgroundContainer />
      <YoutubeLinkInput />
    </div>
  );
};

export default React.memo(BackgroundList);
