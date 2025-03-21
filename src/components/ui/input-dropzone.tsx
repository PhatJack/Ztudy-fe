"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import Dropzone from "react-dropzone";
import { Input } from "./input";
export const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

interface Props {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  avatar: string | null;
}

export default function InputDropzone({ setSelectedFile, avatar }: Props) {
  const [profilePicture, setProfilePicture] = useState<string | null>(avatar);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-32">
        <div className="mt-1 w-full relative mb-4">
          {profilePicture ? (
            <ImagePreview
              url={profilePicture}
              onRemove={() => setProfilePicture(null)}
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
                "image/png": [".png", ".jpg", ".jpeg", ".webp",".gif"],
              }}
              maxFiles={1}
              maxSize={2 * 1024 * 1024} // 2MB
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
                    "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-none focus:border-primary",
                    {
                      "border-primary bg-secondary":
                        isDragActive && isDragAccept,
                      "border-destructive bg-destructive/20":
                        isDragActive && isDragReject,
                    }
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
