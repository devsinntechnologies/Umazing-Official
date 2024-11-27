"use client";

import { Suspense, ReactNode, useEffect } from "react"; // Import ReactNode for type annotation
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer/Footer";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import useClickSound from "@/hooks/useClickSound";
// import useTypingSound from "@/hooks/useTypingSound";


interface ChildProps {
  children: ReactNode; // Define the type for children
}

export default function Child({ children }: ChildProps) {
  
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 w-full min-h-auto">
          {children}
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
