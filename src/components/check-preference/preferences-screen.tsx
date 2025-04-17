"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useStudyListRoomCategories } from "@/service/(rooms)/room-categories/list-study-room-categories.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import LoadingSpinner from "../loading/loading-spinner";
import { useForm } from "react-hook-form";
import { AddInterestsBodySchema } from "@/service/(users)/add-interests.api";
import { Button } from "../ui/button";
import { addInterestsApi } from "@/service/(users)/add-interests.api";
import toast from "react-hot-toast";
import PaginationCustom from "../pagination/PaginationCustom";
import { X } from "lucide-react";
import Image from "next/image";

const PreferencesScreen = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [state, dispatch] = useAuthContext();
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const preferencesForm = useForm<AddInterestsBodySchema>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const roomCategoriesQuery = useQuery({
    ...useStudyListRoomCategories({
      page_size: 15,
      page: currentPage,
    }),
    enabled: !!state.isCheckPreferences,
  });

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
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="md:max-w-3xl rounded-lg w-full p-6 bg-background shadow-lg flex flex-col space-y-6 relative z-[60]"
      >
        <div className="flex justify-between items-center">
          <Link
            href="#"
            className="w-fit flex items-center gap-2 font-semibold"
          >
            <div className="flex size-14 items-center justify-center rounded-md relative overflow-hidden">
              <Image
                alt="Logo"
                className="object-cover"
                src={"/logo1.webp"}
                fill
              />
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
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdatePreferences(category.id);
                }}
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
