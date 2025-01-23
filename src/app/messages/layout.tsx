"use client"
import { Suspense, ReactNode, useEffect } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MessageSideBar from "@/components/message/MessageSideBar";
import { connectSocket } from "@/lib/socket";

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}


export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    return () => {
    connectSocket()
      
    };
  }, [])
  return (
   
    <div className="flex gap-5 w-full h-[calc(100vh-12vh)] flex-col md:flex-row">
      <MessageSideBar />
        <Suspense fallback={<LoadingSpinner />}>
          <div className="flex flex-1">{children}</div>
        </Suspense>
        </div>
   
  );
}
