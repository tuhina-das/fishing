import React from "react";
import { useEffect, useRef } from "react";

export default function FadeIn({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add("fade-in");
    }
  }, []);

  return <div ref={ref}>{children}</div>;
}
