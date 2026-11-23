import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/case-study",
        destination: "/casestudy",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/casestudy",
        permanent: true,
      },
      {
        source: "/casestudies",
        destination: "/casestudy",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Prevent Windows ENOENT / EPERM file-locking errors during Webpack PackFileCache atomic renames
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
