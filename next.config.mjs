/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '97.74.89.204',
        // port: '4000',
        pathname: '/uploads/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'fakestoreapi.com',
      //   pathname: '**',
      // },
    ],
  },
};

export default nextConfig;
