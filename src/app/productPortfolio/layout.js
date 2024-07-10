import "../globals.css";
import React from "react";
import Header  from "../components/Header";
import Footer from "../components/Footer";
import CustomerSearchModal from "../mod/CustomerSearchModal";

export const metadata = {
  title: "Kaspersky | Product Portfolio",
  description: "Next application",
};

export default function Layout({ children }) {
  return (
    <>
          <Header/>
          <CustomerSearchModal/>
          <main>{children}</main>
          <Footer/>
    </>
  );
}
