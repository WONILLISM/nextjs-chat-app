/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://nextjs-chat-app-flax.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
