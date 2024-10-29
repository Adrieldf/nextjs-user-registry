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
import { SessionProvider } from "next-auth/react";

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
  const isLoginPage = pathname === "/login";
  const [pageTitle, setPageTitle] = useState("CE Tech Test");
  const [pageDescription, setPageDescription] = useState(
    "Cyber Energia Technical Test"
  );

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setPageTitle("Dashboard");
        setPageDescription("View your dashboard");
        break;
      case "/userList":
        setPageTitle("User List");
        setPageDescription("Manage and view user information");
        break;
      default:
        setPageTitle("CE Tech Test");
        setPageDescription("CE Tech Test");
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
          <SessionProvider>
            <div className="flex h-screen">
              {!isLoginPage && <Sidebar />}
              <div className="flex-1 flex flex-col">
                {!isLoginPage && <Topbar />}
                <div className="overflow-y-auto h-full">
                  <ToastContainer />
                  {children}
                </div>
              </div>
            </div>
          </SessionProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
