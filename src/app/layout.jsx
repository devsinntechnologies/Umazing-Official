'use client';
// import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
// import HeaderCategory from "@/components/Header/HeaderCategory"; 

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
// export const metadata = {
//   title: "",
//   description: "",
// };

// Create a new instance of QueryClient
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const hidePlusButtonPaths = ['/seller', '/seller/addProduct', '/seller/products'];
  const pathname = usePathname()
  return (
    <QueryClientProvider client={queryClient}>
     <html lang="en">
        <head>
          <title>Umazing</title>
          <link rel="icon/svg" href="/icon.svg" />
        </head>
        <body className={`${poppins.variable} w-screen min-h-screen px-8`}>
     <Provider>
          <Navbar />
          <ToastContainer position="top-right" autoClose={5000} /> {/* Render the ToastContainer here */}
          {/* <HeaderCategory /> */}
          {children}
          <Footer />
          {!hidePlusButtonPaths.includes(pathname) && (
              <div>
                <Link href="/seller" className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-white z-[50]">
                  <Plus size={32} />
                </Link>
              </div>
            )}
          <Toaster />
     </Provider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
