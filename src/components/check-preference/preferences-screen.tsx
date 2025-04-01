"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  useListStudyRoomCategoriesInfinite,
  useStudyListRoomCategories,
} from "@/service/(rooms)/room-categories/list-study-room-categories.api";
import { checkPreferencesApi } from "@/service/(users)/check-preferences.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../loading/loading-spinner";
import { useForm } from "react-hook-form";
import { AddInterestsBodySchema } from "@/service/(users)/add-interests.api";
import { Button } from "../ui/button";
import { addInterestsApi } from "@/service/(users)/add-interests.api";
import toast from "react-hot-toast";
import PaginationCustom from "../pagination/PaginationCustom";
import { X } from "lucide-react";

const PreferencesScreen = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const preferencesForm = useForm<AddInterestsBodySchema>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const roomCategoriesQuery = useQuery(
    useStudyListRoomCategories({
      page_size: 15,
      page: currentPage,
    })
  );
  const [state, dispatch] = useAuthContext();

  const handleUpdatePreferences = (id: number) => {
    setSelectedPreferences((prev) => {
      if (prev.find((preference) => preference === id)) {
        return prev.filter((preference) => preference !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const onSubmit = async (data: AddInterestsBodySchema) => {
    if (!state.user) {
      toast.error("User is not authenticated.");
      return;
    }

    if (selectedPreferences.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    try {
      // Use addInterestsApi to update preferences
      const response = await addInterestsApi(state.user.id, {
        category_ids: selectedPreferences,
      });

      if (response.status === 201) {
        dispatch({ type: "CHECK_PREFERENCES", payload: true });
        setOpen(false);
        toast.success("Thank you for choosing!");
      } else {
        toast.error("Failed to update preferences.");
      }
    } catch (error) {
      console.error("An error occurred while updating preferences:", error);
      toast.error("An error occurred while updating preferences.");
    }
  };

  const isSelected = (id: number) => {
    return selectedPreferences.includes(id);
  };

  return state.isCheckPreferences && open ? (
    <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
      <div className="md:max-w-3xl rounded-lg w-full p-6 bg-white shadow-lg flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <Link
            href="#"
            className="w-fit flex items-center gap-2 font-semibold"
          >
            <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="w-2/3 aspect-square bg-primary flex justify-center items-center rounded-full">
                <svg
                  className="size-8 stroke-2 fill-white"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>ZStudy</title>
                  <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z" />
                </svg>
              </span>
            </div>
          </Link>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="[&_svg]:size-5"
            type="button"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
        <div className="grid gap-3">
          <h2 className="font-bold text-lg">
            Unlock a better Ztudy experience
          </h2>
          <p className="text-sm text-muted-foreground">
            Tell us what subjects you like so we can suggest rooms, tips and
            resources that are specfically tailored to you.
          </p>
        </div>
        <form
          onSubmit={preferencesForm.handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <div className="flex flex-wrap gap-3">
            {roomCategoriesQuery.isLoading ? (
              <div className="w-full h-[220px] flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : null}
            {roomCategoriesQuery.data?.results.map((category) => (
              <div
                key={category.id}
                className={`border p-1.5 rounded-lg text-sm cursor-pointer transition-colors duration-200 
                    ${
                      isSelected(category.id)
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-gray-100"
                    }`}
                onClick={() => handleUpdatePreferences(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
          <div className="w-fit">
            <PaginationCustom
              currentPage={currentPage}
              isDisplayNumber={false}
              onPageChange={(page) => setCurrentPage(page)}
              totalPages={roomCategoriesQuery.data?.totalPages}
            />
          </div>
          <p className="italic text-muted-foreground text-sm">
            You can skip this part!
          </p>
          <Button type="submit" disabled={selectedPreferences.length === 0}>
            {selectedPreferences.length === 0
              ? "Select at least one category"
              : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  ) : null;
};

export default React.memo(PreferencesScreen);
