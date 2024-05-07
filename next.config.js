/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: "/rbits",
    assetPrefix: '/rbits/',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
