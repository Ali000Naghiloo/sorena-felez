/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sorena.webcomdemo.ir",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
