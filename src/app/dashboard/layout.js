import "../globals.css";
import React from "react";
import Header  from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Kaspersky | Dashboard",
  description: "Next application",
};

export default function Layout({ children }) {
  return (
    <>
          <Header/>
          <main>{children}</main>
          <Footer/>
    </>
  );
}
