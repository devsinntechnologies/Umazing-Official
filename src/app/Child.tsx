"use client";

import { Suspense, ReactNode, useEffect } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { usePathname } from 'next/navigation';

interface ChildProps {
  children: ReactNode;
}

export default function Child({ children }: ChildProps) {
  const pathname = usePathname();
  
  // Routes where we don't want to show the footer
  const noFooterRoutes = [
    '/cart',
    '/wishlist',
    '/checkout',
    '/seller',
    '/messages',
    '/seller/dashboard',
    // Add any other seller routes here
  ];

  const shouldShowFooter = !noFooterRoutes.some(route => pathname?.startsWith(route));

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 w-full min-h-auto">
          {children}
        </div>
      </Suspense>
      {shouldShowFooter && <Footer />}
    </>
  );
}