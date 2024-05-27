/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    bashPath: "/its_risk_guardian",
    env: {
        PUBLIC_URL: process.env.PUBLIC_URL,
        DB_URL: process.env.DB_URL
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
