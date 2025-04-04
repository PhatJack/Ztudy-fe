"use client";
import { getQueryClient } from "@/app/get-query-client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputDropzone from "@/components/ui/input-dropzone";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useListStudyRoomCategoriesInfinite } from "@/service/(rooms)/room-categories/list-study-room-categories.api";
import {
  createRoomBodySchema,
  CreateRoomBodySchema,
  useCreateRoomMutation,
} from "@/service/(rooms)/room/create-room.api";
import { useJoinRoomMutation } from "@/service/(rooms)/room/join-room.api";
import { useUploadThumbnailMutation } from "@/service/(rooms)/room/upload-thumbnail.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

const AddNewRoomModal = () => {
  const queryClient = getQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [state] = useAuthContext();
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...useListStudyRoomCategoriesInfinite(),
  });
  const addRoomMutation = useCreateRoomMutation();
  const uploadThumbnailMutation = useUploadThumbnailMutation();
  const addRoomForm = useForm<CreateRoomBodySchema>({
    defaultValues: {
      name: "",
      category: -1,
      max_participants: 1,
      type: "PUBLIC",
      creator_user: 0,
    },
    resolver: zodResolver(createRoomBodySchema),
  });

  const onSubmit = async (data: CreateRoomBodySchema) => {
    const newData = {
      ...data,
      creator_user: state?.user?.id ?? 0,
      category: Number(data.category),
    };
    await addRoomMutation.mutateAsync(newData, {
      onSuccess: async (data) => {
        if (selectedFile) {
          await uploadThumbnailMutation.mutateAsync({
            id: data.id as number,
            body: { thumbnail: selectedFile },
          });
        }
        toast.success("Room created successfully");
        addRoomForm.reset();
        queryClient.invalidateQueries({
          queryKey: ["rooms"],
        });
        setOpen(false);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to create room");
      },
    });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-[300px] min-h-[10em] h-auto text-lg flex-col [&_svg]:size-12 hover:bg-primary/90">
          <span>
            <PlusCircle />
          </span>
          <span>Create Room</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create room to start a new study group
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...addRoomForm}>
            <form onSubmit={addRoomForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <Label>Thumbnail {`(optional)`}</Label>
                <InputDropzone
                  avatar={null}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  widthClass="w-full"
                  heightClass="h-[150px]"
                />
              </div>
              <div className="grid gap-4">
                <FormField
                  control={addRoomForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter room name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addRoomForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {error ? (
                            <p className="text-center w-full">
                              Có lỗi xảy ra.Vui lòng thử F5
                            </p>
                          ) : null}
                          {isLoading && isFetching ? (
                            <div className="w-full h-[100px] flex justify-center items-center">
                              <LoadingSpinner />
                            </div>
                          ) : (
                            <>
                              <SelectItem key={-1} value={String(-1)} disabled>
                                Choose a category
                              </SelectItem>
                              {data?.results?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {
                            <p ref={ref} className="text-center w-full">
                              {isFetchingNextPage
                                ? "Loading more.."
                                : "No more categories"}
                            </p>
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addRoomForm.control}
                  name="max_participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participants</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of participants"
                          {...field}
                          type="number"
                          max={50}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum participants allowed in the room is 50
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addRoomForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                          <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addRoomMutation.isPending}
                >
                  Create Room
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {addRoomMutation.isPending || uploadThumbnailMutation.isPending ? (
          <div className="absolute inset-0 bg-gray-400 bg-clip-padding backdrop-blur-sm backdrop-filter bg-opacity-0 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AddNewRoomModal);
