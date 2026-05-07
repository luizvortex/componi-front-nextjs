import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Componi",
    short_name: "Componi",
    description: "A social network for reusable UI components.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0B0D",
    theme_color: "#8B1A2F",
    categories: ["developer tools", "social"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [],
  };
}
