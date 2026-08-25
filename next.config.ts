import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // Served from the torqueship.com custom domain root — no basePath. (It briefly
  // had one while DNS was pending and the site was only reachable at the GitHub
  // Pages project-page subpath; torqueship.com is confirmed live now.)
  // Art direction is 100% CSS + inline SVG — there are zero raster assets on this
  // site by design. That is the single biggest reason the mobile Lighthouse
  // budget (>=90) is comfortable rather than tight.
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
