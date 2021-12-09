/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    // disableStaticImages: true,
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
