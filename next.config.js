/** @type {import('next').NextConfig} */

const nextConfig = {
    // distDir: 'build',
    output: "export",
    reactStrictMode: false,
    // useFileSystemPublicRoutes: false,
    // bashPath: "https://itsriskguardian.com",
    trailingSlash: true,
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
