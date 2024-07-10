
"use client"
import Script from "next/script";

export default function Foot() {

    return (
        <>
            <Script src="js/script.js" />
            <Script src="js/bootstrap.bundle.js" />
            <Script src="js/bootstrap.bundle.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" />
        </>
    );
}