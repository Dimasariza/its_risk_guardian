/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: true ? "/rbits" : "",
    assetPrefix: true ? '/rbits/' : undefined,
    distDir: 'build',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
