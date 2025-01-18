"use client";

import { Suspense, ReactNode, useEffect } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MessageSideBar from "@/components/chat/message/MessageSideBar";
import Header from "@/components/chat/Header";
import { connectSocket } from "@/lib/socket";
import StoreProvider from "@/app/Provider";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {/* <Toaster /> */}
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
            <div className="flex gap-5 w-full h-[calc(100vh-12vh)] flex-col md:flex-row">
              <MessageSideBar />
              <Suspense fallback={<LoadingSpinner />}>
                <div className="flex flex-1">{children}</div>
              </Suspense>
            </div>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
