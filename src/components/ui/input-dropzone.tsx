"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Input } from "./input";

export const ImagePreview = ({
  url,
  onRemove,
  widthClass = "w-[200px]",
  heightClass = "h-[200px]",
}: {
  url: string;
  onRemove: () => void;
  widthClass?: string;
  heightClass?: string;
}) => (
  <div className={cn("relative", widthClass, heightClass)}>
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <Image
      src={url}
      height={0} // Let Tailwind handle sizing
      width={0}
      alt=""
      className="border border-border rounded-md object-cover h-full w-full"
    />
  </div>
);

interface Props {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  avatar: string | null;
  maxFileSize?: number;
  className?: string;
  widthClass?: string;
  heightClass?: string;
}

export default function InputDropzone({
  setSelectedFile,
  avatar,
  maxFileSize = 2 * 1024 * 1024,
  className,
  widthClass = "w-32",
  heightClass = "h-32",
}: Props) {
  const [profilePicture, setProfilePicture] = useState<string | null>(avatar);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className={cn("w-full", className)}>
        <div className="mt-1 w-full relative mb-4 flex justify-center items-center">
          {profilePicture ? (
            <ImagePreview
              url={profilePicture}
              onRemove={() => setProfilePicture(null)}
              widthClass={widthClass}
              heightClass={heightClass}
            />
          ) : (
            <Dropzone
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                  setSelectedFile(file);
                  const imageUrl = URL.createObjectURL(file);
                  setProfilePicture(imageUrl);
                }
              }}
              accept={{
                "image/png": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
              }}
              maxFiles={1}
              maxSize={maxFileSize}
              onDropRejected={(files) => {
                const file = files[0];
                setError(file.errors[0].message);
              }}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
              }) => (
                <div
                  {...getRootProps()}
                  className={cn(
                    "border border-dashed flex items-center justify-center rounded-md focus:outline-none focus:border-primary",
                    widthClass,
                    heightClass,
                    {
                      "border-primary bg-secondary":
                        isDragActive && isDragAccept,
                      "border-destructive bg-destructive/20":
                        isDragActive && isDragReject,
                    },
                    className
                  )}
                >
                  <Input {...getInputProps()} />
                  <ImageIcon className="h-14 w-14" strokeWidth={1.25} />
                </div>
              )}
            </Dropzone>
          )}
        </div>
      </div>
      {error && <Label className="text-destructive">{error}</Label>}
    </div>
  );
}