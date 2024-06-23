/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SOLANA_URL: "https://api.devnet.solana.com", // solana devnet url
    DEPLOYED_PROGRAM_ADDRESS: "", // deployed program address
    PINATA_JWT: "", // pinata jwt
    PINATA_VIEW_API: "https://ipfs.io/ipfs/", // pinata view api
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
