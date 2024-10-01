// src/app/layout.jsx (or wherever your layout file is located)

'use client';

import localFont from "next/font/local";
import "./globals.css";
// Import Font Awesome CSS
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/Nabar/Navbar"; // Make sure the path is correct
import Footer from "@/components/Footer/Footer"; // Make sure the path is correct
import HeaderCategory from "@/components/Header/HeaderCategory"; // Uncomment if you're using this

config.autoAddCss = false;

// Load custom fonts
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

// Create a new instance of QueryClient
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {/* Uncomment the line below if you want to include the HeaderCategory */}
          {/* <HeaderCategory /> */}
          {children}
          <Footer />
        </body>
      </html>
    </QueryClientProvider>
  );
}
