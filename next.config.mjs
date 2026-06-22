/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.rawpixel.com",
      },
      {
        protocol: "https",
        hostname: "sumansubhan.com",
      },
    ],
  },
};

export default nextConfig;
