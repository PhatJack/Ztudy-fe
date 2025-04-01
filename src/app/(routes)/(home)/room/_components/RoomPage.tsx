import React from "react";
import RoomsContainer from "./RoomsContainer";

const RoomPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-muted/40 size-full p-6 rounded-md flex flex-col space-y-6">
        <RoomsContainer />
      </div>
    </div>
  );
};

export default RoomPage;
