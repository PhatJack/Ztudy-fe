import { RetroGrid } from "@/components/retro/retro-background";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-svh">
      {/* Form Side */}
      <RetroGrid
        angle={0}
        opacity={1}
        lightLineColor="rgba(69, 180, 109,0.8)"
        darkLineColor="rgba(129, 140, 248, 0.3)"
      />
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex size-16 sm:size-14 items-center justify-center text-primary-foreground relative rounded-md overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <Image
                alt="Logo"
                className="object-cover"
                src={"/logo1.webp"}
                fill
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px] p-6 backdrop-blur-sm bg-background/80 rounded-lg border border-border/50 shadow-lg">
            {children}
          </div>
        </div>
        <div className="text-center text-muted-foreground text-sm mt-4">
          © {new Date().getFullYear()} Ztudy. All rights reserved.
        </div>
      </div>
    </div>
  );
}
