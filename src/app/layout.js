import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";
import { Toast } from "@heroui/react";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "B-KROY: Second hand online market",
  description: "B-kroy: Biggest second hand online marketplace in the world",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Suspense
          fallback={
            <div className="h-16 border-b border-white/10 bg-[#0f0f10]" />
          }
        >
          <AppNavbar />
        </Suspense>
        {children}
        <Footer />
        <Toast.Provider />
      </body>
    </html>
  );
}
