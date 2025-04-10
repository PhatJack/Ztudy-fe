import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { menu } from "@/constants/sidebar-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

const HeaderMobileMenu = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <Sheet open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="w-10 h-10 [&_svg]:size-5">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-0" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className="px-6 mb-6">
            <Link
              href={"/dashboard"}
              className="inline-block size-20 rounded-full overflow-hidden relative"
            >
              <Image
                alt="Logo"
                className="object-cover"
                src={"/logo1.webp"}
                fill
              />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className="w-full flex flex-col space-y-1">
          {menu.map((item, index) => (
            <li
              key={index}
              title={item.label}
              onClick={() => setOpenModal(false)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 hover:bg-primary/10 transition-all",
                  isActive(item.href) &&
                    "bg-primary text-white hover:bg-primary/90"
                )}
              >
                <span>
                  <item.icon
                    className={cn(
                      isActive(item.href) ? "text-white" : "text-primary"
                    )}
                  />
                </span>
                <span className={`whitespace-nowrap mt-0.5`}>
                  <strong>{item.label}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 mt-1">
          <div className="size-fit" onClick={() => setOpenModal(false)}>
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobileMenu;
