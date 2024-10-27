"use client";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Navbar/LoadingSpinner";

export default function Child({ children }) {
  return (
    <>
      <Navbar />
     <Suspense fallback={<LoadingSpinner />}>
     <div className="px-2 sm:px-4 md:px-6 lg:px-8 w-full">
        {children}
      </div>
     </Suspense>
      <Footer />
    </>
  );
}
