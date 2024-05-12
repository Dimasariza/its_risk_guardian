/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: "/its_risk_guardian",
    env: {
        BASE_URL: process.env.PUBLIC_URL,
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
