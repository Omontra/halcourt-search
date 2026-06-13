import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app keeps its own lockfile; pin the tracing root to this app so Next
  // doesn't infer the monorepo root from a sibling lockfile.
  outputFileTracingRoot: path.join(import.meta.dirname, "."),
  images: {
    // Placeholder photography source. Replace with Taylor Made's real
    // photography (and likely a Sanity image CDN) before launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
