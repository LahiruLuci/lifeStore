"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Safety timeout in case video doesn't fire "onEnded"
    const t = setTimeout(() => handleHide(), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleHide = () => {
    setFadeOut(true); // trigger fade-out animation
    setTimeout(() => setVisible(false), 2000); // remove after animation
  };

  if (!visible) return null;

  return (
    <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
      <video
        className="loading-video"
        src="/video/123.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleHide}
      />

      <style jsx>{`
        .loading-container {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999;
          opacity: 1;
          transition: opacity 0.7s ease;
        }

        /* Fade-out class activated after video ends */
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .loading-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
