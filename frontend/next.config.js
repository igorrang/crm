/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
};

module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
