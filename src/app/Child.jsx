"use client";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Child({ children }) {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const hidePlusButtonPaths = ['/seller', '/seller/addProduct', '/seller/products'];
  const pathname = usePathname();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      {children}
      <Footer />
      </div> 
      </QueryClientProvider>
    </>
  );
}
