"use client";

import { Suspense, ReactNode, useEffect, useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { usePathname, useRouter } from 'next/navigation';

interface ChildProps {
  children: ReactNode;
}

export default function Child({ children }: ChildProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [messageId, setMessageId] = useState<string | null>(null);

  // Check if the pathname is '/messages' and extract the message ID if available
  useEffect(() => {
    if (pathname?.startsWith('/messages')) {
      const parts = pathname.split('/');
      const id = parts[parts.length - 1];
      setMessageId(id);
    } else {
      setMessageId(null); // Reset message ID if it's not in the '/messages' route
    }
  }, [pathname]);

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
        <div className={`${pathname === '/messages' || messageId ? 'p-0' : 'px-2 sm:px-4 md:px-6 lg:px-8'} w-full min-h-auto`}>
          {children}
        </div>
      </Suspense>
      {shouldShowFooter && <Footer />}
    </>
  );
}
