"use client";
import React from "react";
import ZtudyCommunity from "./ZtudyCommunity";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Clock, Trophy, ArrowRight } from "lucide-react";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";
import { AuroraText } from "@/components/aurora/AuroraText";
import { useTheme } from "next-themes";
import SpotifyEmbed from "@/components/spotify/SpotifyEmbedded";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/aurora/AuroraBackground";

const DashboardPage = () => {
  const { theme } = useTheme();
  const { onlineCount } = useOnlineWebSocket();
  return (
    <div className="relative flex h-full overflow-hidden">
      <div className="flex-1 flex justify-center lg:py-10 lg:px-6 px-4 py-10 w-full xl:pr-[296px]">
        <div className="xl:max-w-[1300px] w-full flex flex-col space-y-6">
          {/* Enhanced Hero Section */}
          <AuroraBackground className="relative overflow-hidden rounded-2xl h-fit border">
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Logo and Title */}
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src={"/logo1.webp"}
                    alt="Logo"
                    className="size-20 rounded-full"
                    width={56}
                    height={56}
                  />
                  <h1 className="text-5xl font-bold tracking-tight">
                    <AuroraText
                      colors={
                        theme === "dark"
                          ? ["#7ccba0", "#f1c27d", "#93d8a5", "#a5f3fc"]
                          : ["#38a169", "#d6a756", "#60b070", "#00f0ff"]
                      }
                    >
                      Ztudy
                    </AuroraText>
                  </h1>
                </div>

                {/* Tagline and Description */}
                <div className="max-w-2xl space-y-4">
                  <p className="text-2xl font-medium text-muted-foreground">
                    Your Personal Learning Companion
                  </p>
                </div>

                {/* Stats and CTA */}
                <div className="w-full flex flex-col items-center gap-6 mt-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border">
                    <span className="size-2 bg-emerald-400 animate-pulse-custom rounded-full"></span>
                    <span className="text-sm font-medium text-foreground">
                      <strong>{onlineCount}{" "}</strong>
                      active learners
                    </span>
                  </div>
                  <Link
                    href={"/solo"}
                    className="group relative w-full max-w-3xl h-[250px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/solo-gif.gif"
                        alt="Study Ambience"
                        fill
                        className="object-center object-cover"
                        unoptimized
                      />
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 mix-blend-overlay opacity-60"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative h-full z-10 p-6 flex flex-col justify-end">
                      {/* Main Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl md:text-3xl font-extrabold font-sans text-white">
                          <AuroraText
                            colors={[
                              "#B2E6D4	",
                              "#9DD9D2",
                              "#C7D9B7",
                              "#83E8BA",
                            ]}
                          >
                            Join Solo Study
                          </AuroraText>
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base text-center">
                          Focus on your studies in a peaceful environment with
                          ambient music and productivity tools
                        </p>
                        {/* Action Button */}
                        <div className="flex justify-start">
                          <Button className="gap-2" variant={"info"}>
                            <span>Start Studying</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-6 right-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          <Clock className="w-4 h-4 text-white" />
                          <span className="text-xs text-white/90">
                            Focus Timer Included
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </AuroraBackground>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Study Rooms</h3>
                  <p className="text-sm text-muted-foreground">
                    Join collaborative learning spaces
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Focus Timer</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your study sessions
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your learning milestones
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Focus Music</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance your study sessions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Music Section */}
          <div className="p-6 rounded-xl bg-background border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Focus Music</h3>
            </div>
            <SpotifyEmbed url="https://open.spotify.com/embed/playlist/37i9dQZF1E4s2rxfOKtG1a?utm_source=generator" />
          </div>

          {/* Mobile Community */}
          <div className="w-full h-fit rounded-xl bg-background border border-border flex-col gap-2 p-4 xl:hidden flex">
            <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">
              Ztudy Community
            </h5>
            <ZtudyCommunity />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Community */}
      <div className="max-w-[270px] w-[270px] h-screen bg-background border-l border-border hidden flex-col gap-2 p-4 xl:flex xl:fixed xl:top-0 xl:right-0 xl:pt-20 ">
        <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">
          Ztudy Community
        </h5>
        <ZtudyCommunity />
      </div>
    </div>
  );
};

export default DashboardPage;
