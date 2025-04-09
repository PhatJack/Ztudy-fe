"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HelpCircle, Home, MoveLeft } from "lucide-react";

export default function NotFound() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  // Ensure confetti only renders client-side after component mounts
  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Confetti effect - only show after component mount */}
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
          colors={["#f43f5e", "#3b82f6", "#a855f7", "#10b981", "#f59e0b"]}
        />
      )}

      {/* Content container */}
      <div className="max-w-4xl w-full bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        <div className="grid md:grid-cols-5">
          {/* Left side - illustration */}
          <div className="md:col-span-2 bg-primary p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <span className="text-9xl font-black text-primary-foreground drop-shadow-lg">
                  404
                </span>
                <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full rotate-12">
                  Not Found
                </div>
              </div>
              <div className="mt-6 text-primary-foreground/90 text-xl font-medium">
                We&apos;ve lost this page
              </div>
            </div>
          </div>

          {/* Right side - content */}
          <div className="md:col-span-3 p-8 md:p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Page not found
                </h2>
                <p className="text-muted-foreground">
                  Sorry, the page you are looking for doesn&#39;t exist or has been
                  moved.
                </p>
              </div>

              <div className="h-px w-full bg-border" />

              <div className="space-y-4">
                <p className="text-foreground">
                  You might want to check if you typed the address correctly or
                  go back to the homepage and start fresh.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link
                      href="/"
                      replace={true}
                      className="flex items-center justify-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Back to homepage
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-secondary text-secondary hover:bg-secondary/10"
                    asChild
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Contact support
                    </Link>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground mt-2"
                  onClick={() => window.history.back()}
                >
                  <MoveLeft className="h-3 w-3 mr-1" />
                  Go back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
