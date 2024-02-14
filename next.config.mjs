/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pimage.vercel.app'
      }
    ]
  }
};

export default nextConfig;
