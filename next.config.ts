import type { NextConfig } from "next";

// GitHub Actions builds this as a project page at MAAN31.github.io/torque-ship,
// so asset/route URLs need the repo name prefixed. Local dev stays at the root.
const repoName = "torque-ship";
const basePath = process.env.GITHUB_ACTIONS ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Art direction is 100% CSS + inline SVG — there are zero raster assets on this
  // site by design. That is the single biggest reason the mobile Lighthouse
  // budget (>=90) is comfortable rather than tight.
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
