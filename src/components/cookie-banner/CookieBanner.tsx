"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookie-accepted");
    if (!hasAccepted) {
      setShowBanner(true);
      setTimeout(() => setVisible(true), 50);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-accepted", "true");
    setVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] transition-all duration-300 ease-in-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <Card className="shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900">
        <CardContent className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            This website uses cookies to enhance your experience.
            <Button variant={"link"} asChild>
              <Link href="/privacy-policy">Learn more</Link>
            </Button>
          </div>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
