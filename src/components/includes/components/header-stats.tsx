import { levels } from "@/constants/level-borders";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";
import { Aperture, Clock9 } from "lucide-react";
import React from "react";

interface Props {
  user?: CurrentUserResponseSchema;
}

const HeaderStats = ({ user }: Props) => {
  return (
    <div className="flex space-x-6">
      {user && (
        <>
          <div className="flex items-center gap-1 text-sm">
            <Clock9
              size={20}
              className="fill-primary stroke-white border border-accent rounded-full"
            />
            <span id="monthly-time">
              <span className="font-bold mr-0.5">
                {user.monthly_study_time.toFixed(1)}h
              </span>
              Monthly time
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Aperture size={20} className="fill-primary stroke-white border border-accent rounded-full" />
            <span className=""></span>
            <span id="monthly-level">
              <span className="font-bold mr-0.5">
                {levels.indexOf(user.monthly_level) + 1}/{levels.length}
              </span>
              Monthly level
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderStats;
