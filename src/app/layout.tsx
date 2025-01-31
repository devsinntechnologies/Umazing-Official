// import { Poppins } from "next/font/google";
import { Urbanist, Noto_Nastaliq_Urdu } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster";
import Child from "./Child";
import { ReactNode } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";


import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';


const urbanist = Urbanist({ subsets: ["latin"] });
// const notoNastaliq = Noto_Nastaliq_Urdu({ subsets: ["latin-ext", "arabic"] });
const jameelNooriNastleeq = localFont({ src: '../fonts/jameelNooriNastleeq.ttf' })

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-poppins",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata = {
  title: "Umazing Official",
  description: "",
};

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <head>
        <title>Umazing Official</title>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className={`${urbanist.className} ${ locale === "ur" ? jameelNooriNastleeq.className : "" } w-screen min-h-screen`}>
      <NextIntlClientProvider messages={messages}>
        <Provider>
          <TooltipProvider>
          <Child>{children}</Child>
          </TooltipProvider>
          <Toaster />
        </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
