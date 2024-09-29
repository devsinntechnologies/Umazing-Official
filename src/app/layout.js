'use client'
import localFont from "next/font/local";
import "./globals.css";
 // import Font Awesome CSS
 import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
 import "@fortawesome/fontawesome-svg-core/styles.css";
 import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/Nabar/Navbar";
import HeaderCategory from "@/components/Header/HeaderCategory";
import Footer from "@/components/Footer/Footer";
 config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const queryClient=new QueryClient()


export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </QueryClientProvider>
  );
}
