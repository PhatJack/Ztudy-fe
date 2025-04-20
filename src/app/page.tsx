"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, Timer } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="size-14">
            <Link
              href={"/"}
              className="aspect-square w-full flex justify-center items-center relative rounded-md overflow-hidden"
            >
              <Image
                alt="Logo"
                className="object-cover"
                src={"/logo1.webp"}
                fill
              />
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button asChild size={"lg"}>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button
              asChild
              size={"lg"}
              variant={"outline"}
              className="border-gray-400"
            >
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Learn Better. <span className="text-primary">Study Smarter.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Your ultimate platform for efficient learning and study
              management. Transform the way you learn with Ztudy&apos;s powerful
              tools and features.
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                size={"lg"}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Link href={"/register"}>Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full h-64 md:h-[360px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg overflow-hidden relative shadow-lg">
              <Image
                src={"/preview-dashboard.png"}
                alt="Hero Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card border border-primary/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Interactive Study Materials
            </h3>
            <p className="text-muted-foreground">
              Access interactive flashcards, quizzes, and study guides to
              enhance your learning experience.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card border border-primary/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
              <Timer className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Study Planning</h3>
            <p className="text-muted-foreground">
              AI-powered study planner that adapts to your learning pace and
              schedule to optimize your study time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card border border-primary/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Collaborative Learning
            </h3>
            <p className="text-muted-foreground">
              Connect with peers, share notes, and form study groups to enhance
              your understanding through collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have improved their learning
              outcomes with Ztudy&apos;s powerful platform.
            </p>
            <Button
              size={"lg"}
              asChild
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Link href={"/login"}>Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-6">
        <div className="container mx-auto px-6">
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ztudy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
