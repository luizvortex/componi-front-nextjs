"use client";

import { useEffect, useState } from "react";

export function useViewport(initial = 1280): number {
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
