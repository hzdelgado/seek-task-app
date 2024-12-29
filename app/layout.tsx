"use client"; 

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OverlayLoader from "@/components/loader/OverlayLoader";
import { LoaderProvider } from "@/application/context/LoaderContext";
import { store } from "@/infrastructure/adapters/redux/store";
import { Provider } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><Provider store={store}>
          <LoaderProvider>
            <OverlayLoader />
            {children}
          </LoaderProvider>
        </Provider>
      </body>
    </html>
  );
}
