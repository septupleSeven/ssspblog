/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NOTION_TOKEN: process.env.NOTION_TOKEN,
        NOTION_DATABASEID: process.env.NOTION_DATABASEID
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "www.notion.so"
        }]
    }
};

export default nextConfig;
