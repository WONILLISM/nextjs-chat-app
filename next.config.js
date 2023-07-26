/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: `https://nextjs-chat-brggj11u9-wonillism.vercel.app/api/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
