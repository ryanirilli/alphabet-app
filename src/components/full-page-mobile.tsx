"use client";

import { useEffect, useRef } from "react";

export default function FullPageMobile() {
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Callback function to handle resizing
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.contentRect.width < 640) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      }
    };

    // Initialize ResizeObserver
    resizeObserver.current = new ResizeObserver(handleResize);

    // Start observing the document body
    resizeObserver.current.observe(document.body);

    // Cleanup
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return null;
}
