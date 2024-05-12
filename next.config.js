/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: "/its_risk_guardian",
    // assetPrefix: '/rbits/',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
