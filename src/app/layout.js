'use client';
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
import Navbar from "@/components/Nabar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster"
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
  return (
    <QueryClientProvider client={queryClient}>
     <Provider>
     <html lang="en">
        <head>
          <title>Umazing</title>
          <link rel="icon/svg" href="/icon.svg" />
        </head>
        <body className={`${poppins.variable}`}>
          <Navbar />
          <ToastContainer position="top-right" autoClose={5000} /> {/* Render the ToastContainer here */}
          {/* <HeaderCategory /> */}
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
     </Provider>
    </QueryClientProvider>
  );
}
