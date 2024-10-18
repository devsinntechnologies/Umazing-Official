import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster"
import Child from "./Child";
import Head from "next/head";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
export const metadata = {
  title: "Umazing Official",
  description: "",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <Head>
          <title>Umazing</title>
          <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        </Head>
        {/* Also change Padding of navbar */}
        <body className={`${poppins.variable} w-screen min-h-screen px-2 sm:px-4 md:px-6 lg:px-8`}>
          <Provider>
            <Child>
              {children}
            </Child>
            <Toaster />
          </Provider>
        </body>
      </html>
  );
}
