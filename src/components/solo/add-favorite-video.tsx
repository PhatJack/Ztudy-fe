"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  useCreateUserFavoriteVideoApi,
  CreateUserFavoriteVideoSchema,
  createUserFavoriteVideoSchema,
} from "@/service/(user-favorite-video)/add-user-favorite-video.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UrlToEmbeded } from "@/util/urlToEmbed";
import { useSoloContext } from "@/hooks/useSoloContext";

const AddFavoriteVideoModal = ({ children }: { children: React.ReactNode }) => {
  const [stateSolo, dispatchSolo] = useSoloContext();
  const [state, dispatch] = useAuthContext();
  const [open, setOpen] = useState(false);
  const [playVideoOpen, setPlayVideoOpen] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState<string | undefined>(undefined);
  const createFavoriteMutation = useCreateUserFavoriteVideoApi();

  const form = useForm<CreateUserFavoriteVideoSchema>({
    resolver: zodResolver(createUserFavoriteVideoSchema),
    defaultValues: {
      youtube_url: "",
      user: 0,
    },
  });

  const onSubmit = (data: CreateUserFavoriteVideoSchema) => {
    // Convert form values to API expected format

    if (data.youtube_url === "") {
      toast.error("Youtube URL is required.");
      return;
    }

    let url: URL;
    try {
      url = new URL(data.youtube_url);
    } catch {
      toast.error("Invalid Youtube URL.");
      return;
    }
    const youtubeId = url.searchParams.get("v");
    const video = UrlToEmbeded(`https://www.youtube.com/watch?v=${youtubeId}`);
    if (!video) {
      toast.error("Invalid Youtube URL.");
      return;
    }

    const newData = {
      ...data,
      user: state.user?.id,
      youtube_url: `https://www.youtube.com/watch?v=${youtubeId}`,
    };

    createFavoriteMutation.mutate(newData, {
      onSuccess: () => {
        toast.success("Favorite song added successfully!");
        form.reset();
        setOpen(false);
        // Save video embed info and show play confirmation dialog
        setVideoEmbed(`https://www.youtube.com/watch?v=${youtubeId}`);
        setPlayVideoOpen(true);
      },
      onError: (error: any) => {
        toast.error(
          error.youtube_url || "Failed to add favorite song. Please try again."
        );
      },
    });
  };

  const handlePlayVideo = () => {
    // Dispatch action to play the video in the app
    if (videoEmbed && dispatchSolo) {
      console.log(videoEmbed);
      dispatchSolo({
        type: "SET_BACKGROUND",
        payload: videoEmbed,
      });
      toast.success("Playing your favorite song!");
    }
    setPlayVideoOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Favorite Song</DialogTitle>
            <DialogDescription>
              Add a new song to your favorites list. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="youtube_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter youtube URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      For example:{" "}
                      <span className="font-bold">
                        https://www.youtube.com/watch?v=VIDEO_ID
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createFavoriteMutation.isPending}
                >
                  {createFavoriteMutation.isPending ? "Saving..." : "Save song"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Play Video Confirmation Dialog */}
      <Dialog open={playVideoOpen} onOpenChange={setPlayVideoOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Play Song</DialogTitle>
            <DialogDescription>
              Would you like to play this song right now?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setPlayVideoOpen(false)}>
              Not now
            </Button>
            <Button onClick={handlePlayVideo}>Yes, play now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFavoriteVideoModal;
