"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getLevelColor } from "@/util/generateRandomColorForLevel";
import { MonthlyLevelSchema } from "@/lib/schemas/monthly-level.schema";
import { useTheme } from "next-themes";

interface AchievementPopupProps {
  level: MonthlyLevelSchema | undefined;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({
  level,
  message = "Congratulations! You've reached a new level!",
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowConfetti(true);

      // Play sound effect when popup opens
      const sound = new Audio("/level-up.mp3");
      sound.play().catch((err) => console.error("Error playing sound:", err));

      // Auto-hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Handle closing animation
      setIsVisible(false);
      // Give time for exit animation before fully hiding
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 300); // match transition duration

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  };

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.2}
        />
      )}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className="relative w-full max-w-md p-6 mx-4 bg-gradient-to-b from-background to-background rounded-lg shadow-2xl transition-all duration-300 ease-in-out"
          style={{
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex justify-center">
            <div className="relative hover-float">
              <div className="absolute inset-0 rounded-full bg-yellow-300 blur-lg opacity-50"></div>
              <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-amber-600 rounded-full shadow-lg">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <div className="pt-12 text-center">
            <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-bold">Level Up!</h3>
              <div className="my-4 flex justify-center items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-4xl font-extrabold">
                  Level
                  <span
                    className="ml-2"
                    style={
                      level
                        ? {
                            color: getLevelColor(
                              level,
                              theme === "dark" ? "dark" : "light"
                            ),
                          }
                        : undefined
                    }
                  >
                    {level}
                  </span>
                </span>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-200">{message}</p>
            </div>

            <div className="fade-in" style={{ animationDelay: "0.7s" }}>
              <div className="mt-8">
                <Button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  Awesome!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hover-float {
          animation: floatAnimation 2s ease-in-out infinite;
        }

        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        .fade-in-scale {
          opacity: 0;
          animation: fadeInScale 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default AchievementPopup;
