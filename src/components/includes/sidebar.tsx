import Link from "next/link";
import React, { memo } from "react";
import SidebarMenu from "./components/sidebar-menu";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import Image from "next/image";

function Sidebar() {
  return (
    <div className="md:max-w-24 h-full fixed left-0 top-0 z-40 p-2 box-border hidden md:flex flex-col justify-between items-center bg-white dark:bg-background border-r">
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full p-3">
          <Link
            href={"/dashboard"}
            className="aspect-square w-full flex justify-center items-center relative rounded-full overflow-hidden"
          >
            <Image
              alt="Logo"
              className="object-cover"
              src={"/logo1.webp"}
              fill
            />
          </Link>
        </div>
        <Separator />
        <SidebarMenu />
      </div>
      <div className="grid gap-2 ">
        <Separator />
        <ModeToggle />
      </div>
    </div>
  );
}
export default memo(Sidebar);
