"use client";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";
import React from "react";
import AvatarCustom from "../avatar/AvatarCustom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { getLevelColor } from "@/util/generateRandomColorForLevel";
import { useTheme } from "next-themes";

interface Props {
  user: CurrentUserResponseSchema;
}

const CommunityItem = ({ user }: Props) => {
  const { theme } = useTheme();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex space-x-2 items-center pt-2 px-2">
          <div className="relative">
            <AvatarCustom
              className="rounded-full w-9 h-9"
              src={user.avatar || "/default.png"}
            />
            {user.is_online && (
              <span className="size-3 rounded-full bg-emerald-400 absolute right-0 bottom-0 border-2 border-white"></span>
            )}
          </div>
          <span className="text-sm">{user.username}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-0 transform transition-transform duration-300">
        {/* Gradient Header with Glass Effect */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-600 p-4 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="flex items-center space-x-4 relative z-10">
            <div className="relative">
              <AvatarCustom
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg transition-transform duration-300"
                src={user.avatar || "/default.png"}
              />
              {user.is_online && (
                <span className="absolute bottom-0 right-0 size-3 bg-emerald-400 border-3 border-white rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h4 className="text-xl font-extrabold leading-tight drop-shadow-md">
                {user.first_name} {user.last_name}
              </h4>
              <p className="text-sm text-white/90 font-medium tracking-wide">
                @{user.username}
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 text-sm">
          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="text-lg">📧</span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {user.email}
            </span>
          </div>

          {/* Study Time */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-2 hover:shadow-md transition-shadow">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              🕓 Monthly Study:
            </span>
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full font-semibold text-xs shadow-sm">
              {user.monthly_study_time.toFixed(1)} hours
            </span>
          </div>

          {/* Monthly Level */}
          <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-2 hover:shadow-md transition-shadow">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              🌟 Monthly Level:
            </span>
            <span
              className="ml-2 font-bold text-lg animate-pulse"
              style={{
                color: getLevelColor(
                  user.monthly_level,
                  theme === "dark" ? "dark" : "light"
                ),
                textShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {user.monthly_level}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-lg p-2 hover:shadow-md transition-shadow">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-xs shadow-sm ${
                user.is_active
                  ? "bg-emerald-500 text-white animate-bounce-slow"
                  : "bg-rose-500 text-white"
              }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Join Date */}
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 font-medium tracking-wide flex items-center gap-2">
            <span className="text-yellow-500 text-lg">🎉</span>
            Joined: {new Date(user.date_joined).toLocaleDateString()}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CommunityItem;
