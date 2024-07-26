import "../globals.css";
import React from "react";

export const metadata = {
  title: "Kaspersky |",
  description: "Next application",
};

export default function Layout({ children }) {
  return (
    <>
          <main>{children}</main>
    </>
  );
}
