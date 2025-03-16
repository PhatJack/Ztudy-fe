"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createGetCurrentUserInformationQueryOptions } from "@/service/(current-user)/get-current-user-information";
import { useStudyListRoomCategories } from "@/service/(room)/room-categories/list-study-room-categories.api";
import {
  createStudyGroupBodySchema,
  CreateStudyGroupBodySchema,
  useCreateStudyGroupMutation,
} from "@/service/(study-group)/create-study-group.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddNewRoomModal = () => {
  const userQuery = useQuery(createGetCurrentUserInformationQueryOptions());
  const roomCategoriesQuery = useQuery({
    ...useStudyListRoomCategories(),
		staleTime: 300000,
    enabled: false,
  });
  const addRoomMutation = useCreateStudyGroupMutation();
  const addRoomForm = useForm<CreateStudyGroupBodySchema>({
    defaultValues: {
      name: "",
      category: "",
      max_participants: "",
      type: "PUBLIC",
    },
    resolver: zodResolver(createStudyGroupBodySchema),
  });

  const onSubmit = (data: CreateStudyGroupBodySchema) => {
    console.log(data);
    addRoomMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Room created successfully");
        addRoomForm.reset();
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to create room");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-[300px] h-[200px] text-lg flex-col [&_svg]:size-12 hover:bg-primary/90">
          <span>
            <PlusCircle />
          </span>
          <span>Add New Room</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Create room to start a new study group
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...addRoomForm}>
            <form onSubmit={addRoomForm.handleSubmit(onSubmit)}>
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
                        onOpenChange={(open) =>
                          open && roomCategoriesQuery.refetch()
                        }
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomCategoriesQuery.isLoading &&
                          roomCategoriesQuery.isFetching ? (
                            <div className="w-full h-[100px] flex justify-center items-center">
                              <LoadingSpinner />
                            </div>
                          ) : (
                            roomCategoriesQuery.data?.results.map(
                              (category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  {category.name}
                                </SelectItem>
                              )
                            )
                          )}
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
                          min={1}
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
                      <FormLabel>Category</FormLabel>
                      <FormControl>
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
                            <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                            <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Room
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRoomModal;
