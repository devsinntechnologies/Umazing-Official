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
      {children}
      <Footer />
      {isLoggedIn && !hidePlusButtonPaths.includes(pathname) && (
        <div>
          <Link href="/seller" className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-white z-[50]">
            <Plus size={28} />
          </Link>
        </div>
      )}
    </QueryClientProvider>
    </>
  );
}
