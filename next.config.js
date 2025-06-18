/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ipfs.io', 
      'gateway.pinata.cloud',
      'cloudflare-ipfs.com',
      'gateway.ipfs.io'
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Vercel deployment optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true
};

module.exports = nextConfig;
