"use client"
import React from "react";
import RoomsContainer from "./RoomsContainer";
import RoomProviders from "../providers";

const RoomPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-muted/40 size-full p-6 rounded-md flex flex-col space-y-6">
        <RoomProviders>
          <RoomsContainer />
        </RoomProviders>
      </div>
    </div>
  );
};

export default RoomPage;
