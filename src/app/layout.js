import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Head from "./components/Head";
import Foot from "./components/Foot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kaspersky | Login",
  description: "Next application",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <Head />
        </head>
        <body className={inter.className}>
          <main>{children}</main>
          <Foot/>
        </body>
      </html>
    </>
  );
}
