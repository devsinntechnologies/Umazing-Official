// @ts-nocheck
"use client";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MessageSideBar from "@/components/message/MessageSideBar";
import { ReactNode, Suspense } from "react";

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex gap-5 w-full h-[calc(100vh-80px)] flex-col  lg:flex-row my-4 ">
      <MessageSideBar />
      <Suspense fallback={<LoadingSpinner/>}>
      <div className=" flex flex-1">{children}</div>
      </Suspense>
    </div>
  );
}
