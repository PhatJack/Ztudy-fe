import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStatsBlockProps {
  userId: string;
}

const UserStatsBlock = ({ userId }: UserStatsBlockProps) => {
  // Mock data - replace with actual API call
  const stats = {
    completionRate: 78,
    courses: 12,
    totalHours: 86,
    averageScore: 92,
  };

  return (
    <Card className="bg-white dark:bg-background shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>Thống kê người dùng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-slate-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-500"
                strokeWidth="10"
                strokeDasharray={`${stats.completionRate * 2.51} 251`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                style={{ 
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
            <span className="absolute text-xl font-bold">
              {stats.completionRate}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-md">
            <span className="text-sm text-muted-foreground">Khóa học</span>
            <span className="text-xl font-bold">{stats.courses}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-md">
            <span className="text-sm text-muted-foreground">Giờ học</span>
            <span className="text-xl font-bold">{stats.totalHours}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-md col-span-2">
            <span className="text-sm text-muted-foreground">Điểm trung bình</span>
            <span className="text-xl font-bold">{stats.averageScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsBlock;
