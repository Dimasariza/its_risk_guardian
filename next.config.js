/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    // bashPath: "/rbits",
    // assetPrefix: '/rbits/',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
