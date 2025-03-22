import React, { Suspense } from "react";
import AddNewRoomModal from "./AddNewRoomModal";
import LoadingSpinner from "@/components/loading/loading-spinner";
import RoomsContainer from "./RoomsContainer";

const StudyGroupPage = () => {	
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-muted/40 size-full p-6 rounded-md flex flex-col space-y-6">
        <AddNewRoomModal />
        <Suspense
          fallback={
            <div className="w-full h-[300px] flex justify-center items-center">
              <LoadingSpinner />
            </div>
          }
        >
          <RoomsContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default StudyGroupPage;
