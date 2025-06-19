/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for static export
    domains: [], // Add any external image domains if needed
  },
  // Add rewrites to proxy API requests to the backend during development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*', // Proxy uploaded files to Backend
      },
    ]
  },
}

module.exports = nextConfig 