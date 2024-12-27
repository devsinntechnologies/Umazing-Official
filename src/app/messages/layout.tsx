// @ts-nocheck
"use client";
import MessageSideBar from "@/components/message/MessageSideBar";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex gap-5 w-full flex-col  lg:flex-row my-4 ">
      <MessageSideBar />
      <div className=" flex flex-1">{children}</div>
    </div>
  );
}
