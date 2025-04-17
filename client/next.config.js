/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['estomedia.com'],
    },
    env: {
      NEXT_PUBLIC_AXIOS_URL: process.env.NEXT_PUBLIC_AXIOS_URL,
    },
  };
  
  module.exports = nextConfig;
  
  // Anass: product store problem...
  