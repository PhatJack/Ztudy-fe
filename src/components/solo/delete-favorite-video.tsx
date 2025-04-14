"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteFavoriteVideoProps {
  videoId: number;
  videoTitle?: string;
  onDelete: (videoId: number) => void;
  children: React.ReactNode;
}

const DeleteFavoriteVideo = ({
  videoId,
  videoTitle,
  onDelete,
  children,
}: DeleteFavoriteVideoProps) => {
  const handleDelete = () => {
    onDelete(videoId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-bold">
              {videoTitle ? `"${videoTitle}"` : "this video"}
            </span>{" "}
            from your favorites? 
						<br />
						This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            asChild
          >
            <Button
              variant={"destructive"}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFavoriteVideo;
