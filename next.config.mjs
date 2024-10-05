/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
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
