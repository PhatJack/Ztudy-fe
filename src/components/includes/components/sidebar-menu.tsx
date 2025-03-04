"use client";
import { menu } from "@/constants/sidebar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMenu() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <ul className="w-full flex flex-col gap-1">
      {menu.map((item, index) => (
        <li key={index} title={item.label}>
          <Link
            href={item.href}
            className={cn(
              "flex flex-col justify-center items-center gap-1 rounded-md p-2 hover:bg-primary/10 transition-all",
              isActive(item.href) && "bg-primary text-white hover:bg-primary/90"
            )}
          >
            <span>
              <item.icon
                size={28}
                className={cn(
                  isActive(item.href) ? "text-white" : "text-primary"
                )}
              />
            </span>
            <span className={`text-xs whitespace-nowrap`}>
              <strong>{item.label}</strong>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
