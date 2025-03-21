import { Clock9 } from "lucide-react";
import React from "react";

const HeaderStats = () => {
  return (
    <div className="flex space-x-2">
      <div className="flex items-center gap-1 text-sm">
        <Clock9 size={20} className="stroke-gray-200 fill-secondary" />
        <span id="monthly-time" className="font-bold">
          0.2h
        </span>
        <span className="">Monthly time</span>
      </div>
    </div>
  );
};

export default HeaderStats;
