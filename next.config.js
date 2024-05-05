/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: isProd ? "/rbits" : "",
    assetPrefix: isProd ? '/rbits/' : undefined,
    distDir: 'build',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
