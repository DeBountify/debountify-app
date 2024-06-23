/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "ipfs.io",
          port: '',
          pathname: '/',
        },
      ],
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;
  