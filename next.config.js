/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: false,
    bashPath: "/its_risk_guardian",
    env: {
        PUBLIC_URL: process.env.PUBLIC_URL,
        DB_URL: process.env.DB_URL,
        AUTH_URL: process.env.AUTH_URL,
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
