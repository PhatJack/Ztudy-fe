"use client";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <>
      <div className="w-full grid h-[100vh] place-items-center bg-white dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/" replace={true} className="font-semibold">
                Go back home
              </Link>
            </Button>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
