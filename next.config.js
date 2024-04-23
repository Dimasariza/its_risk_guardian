/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    basePath: "/rbits/",
    // assetPrefix: '/rbits/',
}

module.exports = nextConfig

// const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');
// module.exports = withPlugins([
//     [optimizedImages, {
//         mozjpeg: {
//             quality: 80,    
//         },
//             pngquant: {
//             speed: 3,
//             strip: true,
//             verbose: true,
//         },
//         imagesPublicPath: '/rbits/_next/static/images/',
//     }],
//     {
//         basePath: '/rbits',
//         assetPrefix: '/rbits/',
//         // env,
//     },
// ]);