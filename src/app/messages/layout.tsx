"use client";
import { Suspense, ReactNode, useEffect } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MessageSideBar from "@/components/message/MessageSideBar";
import { connectSocket, disconnectSocket } from "@/lib/socket"; // Assuming disconnectSocket is defined to close the socket connection

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Connect to socket on mount
    connectSocket();

    // Cleanup function to disconnect socket when the component unmounts
    return () => {
      disconnectSocket();
    };
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="flex gap-5 w-full h-[calc(100vh-12vh)] flex-col md:flex-row">
      <MessageSideBar />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex flex-1">{children}</div>
      </Suspense>
    </div>
  );
}
