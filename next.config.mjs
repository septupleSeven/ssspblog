/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NOTION_TOKEN: process.env.NOTION_TOKEN,
        NOTION_DATABASEID: process.env.NOTION_DATABASEID,
        NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER,
        NOTION_TOKEN_V2: process.env.NOTION_TOKEN_V2
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "www.notion.so"
        }]
    },
    async redirects(){
        return [
            {
                source: '/search',
                missing: [
                    {
                        type: 'query',
                        key: "keyword",
                    }
                ],
                permanent: false,
                destination: '/'
            },
            {
                source: '/search',
                missing: [
                    {
                        type: 'query',
                        key: "keyword",
                        value: ""
                    }
                ],
                permanent: false,
                destination: '/'
            }
        ]
    }
};

export default nextConfig;
