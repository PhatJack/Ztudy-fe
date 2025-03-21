"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  EditUserBodySchema,
  useEditUserMutation,
} from "@/service/(current-user)/edit-user.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import InputDropzone from "../ui/input-dropzone";
import { useUploadAvatarMutation } from "@/service/(users)/upload-avatar.api";
import toast from "react-hot-toast";
import LoadingSpinner from "../loading/loading-spinner";

interface Props {
  children: React.ReactNode;
}

const EditProfileDialog = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, dispatch] = useAuthContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const editProfileForm = useForm<EditUserBodySchema>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
    },
  });

  const uploadAvatarMutation = useUploadAvatarMutation();
  const editUserMutation = useEditUserMutation();

  useEffect(() => {
    if (state.user) {
      editProfileForm.reset({
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        email: state.user.email,
        username: state.user.username,
      });
    }
  }, [state.user, editProfileForm.reset]);

  const onSubmit = async (data: EditUserBodySchema) => {
    if (selectedFile && selectedFile.name !== state.user?.avatar) {
      await uploadAvatarMutation.mutateAsync(
        {
          id: state.user?.id as number,
          body: { avatar: selectedFile },
        },
        {
          onSuccess(data) {
            dispatch({
              type: "SET_USER",
              payload: {
                ...state.user,
                avatar: data.avatar,
                id: state.user?.id as number,
                email: state.user?.email as string,
                last_login: state.user?.last_login as Date,
                is_online: state.user?.is_online as boolean,
                is_active: state.user?.is_active as boolean,
                username: state.user?.username as string,
                first_name: state.user?.first_name as string,
                last_name: state.user?.last_name as string,
                date_joined: state.user?.date_joined as Date,
                created_at: state.user?.created_at as Date,
                updated_at: state.user?.updated_at as Date,
              },
            });
          },
        }
      );
    }
    await editUserMutation.mutateAsync(data, {
      onSuccess() {
        editProfileForm.reset(data);
        toast.success("Profile updated successfully");
      },
      onError(error) {
        console.log(error);
        toast.error("Failed to update profile");
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="min-[426px]:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...editProfileForm}>
          <form
            onSubmit={editProfileForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="w-full flex justify-center">
              <InputDropzone
                avatar={state.user?.avatar ?? null}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
            <div className="w-full flex gap-4">
              <FormField
                control={editProfileForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={editProfileForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={editProfileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={
                editUserMutation.isPending || uploadAvatarMutation.isPending
              }
            >
              {editUserMutation.isPending || uploadAvatarMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(EditProfileDialog);
