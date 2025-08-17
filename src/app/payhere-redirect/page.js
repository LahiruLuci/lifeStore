"use client";
import { useEffect } from "react";

export default function PayHereRedirectPage({ searchParams }) {
  useEffect(() => {
    if (window.opener) {
      // Send result back to main window
      window.opener.postMessage(
        {
          status: searchParams.status,
          orderId: searchParams.order_id,
        },
        "*"
      );
    }
    // Close immediately
    window.close();
  }, [searchParams]);

  return null; // ⬅️ nothing rendered
}
