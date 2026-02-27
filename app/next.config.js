/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // Resolve optional pino-pretty (used by wallet-adapter deps) to empty module
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': path.join(__dirname, 'empty-module.js'),
    };
    return config;
  },
};

module.exports = nextConfig;
