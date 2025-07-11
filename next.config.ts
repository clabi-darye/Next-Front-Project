/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
