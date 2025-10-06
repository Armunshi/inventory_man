
import React from "react";
import "./globals.css"; // add this at the top of layout.tsx
import Providers from "./providers";
import { Navbar } from "@/components/Navbar";
// import { auth } from "@/lib/auth";
export const metadata = {
  title: "Inventora",
  description: "Auth test",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
