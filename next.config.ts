import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() {
    return [
      {
        source: '/perfume',
        destination: '/collections/perfume',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
