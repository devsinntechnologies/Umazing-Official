"use client"
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster";
import Child from "./Child";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Umazing Official",
  description: "",
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Umazing Official</title>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className={`${urbanist.className} w-screen min-h-screen`}>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider>
              <Child>{children}</Child>
            </TooltipProvider>
            <Toaster />
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
