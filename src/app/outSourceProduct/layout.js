import React from "react";

export const metadata = {
  title: "Kaspersky | Product",
  description: "Next application",
};

export default function Layout({ children }) {
  return (
    <>
          <main>{children}</main>
    </>
  );
}
