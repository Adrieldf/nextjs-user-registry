"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";
import QueryClientContextProvider from "../components/QueryClientContextProvider";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("My App");
  const [pageDescription, setPageDescription] = useState(
    "A description of my app"
  );

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setPageTitle("Dashboard - My App");
        setPageDescription("View your dashboard and manage your settings");
        break;
      case "/users":
        setPageTitle("User List - My App");
        setPageDescription("Manage and view user information");
        break;
      default:
        setPageTitle("My App");
        setPageDescription("A description of my app");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          bg-slate-800 text-slate-100 mx-auto`}
      >
        <QueryClientContextProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <div className="overflow-y-auto h-full">
                <ToastContainer />
                {children}
              </div>
            </div>
          </div>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
