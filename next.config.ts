/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
  // Only use static export and basePath for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/pulse-smv',
    assetPrefix: '/pulse-smv',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
