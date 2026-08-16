import type { NextConfig } from "next";

// torqueship.com DNS isn't live yet, so the site is actually being served at
// maan31.github.io/torque-ship — remove this basePath once the custom domain
// (public/CNAME) is verified and serving from the root.
const basePath = "/torque-ship";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  // Art direction is 100% CSS + inline SVG — there are zero raster assets on this
  // site by design. That is the single biggest reason the mobile Lighthouse
  // budget (>=90) is comfortable rather than tight.
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
