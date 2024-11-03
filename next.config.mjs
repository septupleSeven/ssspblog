/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        NOTION_TOKEN: process.env.NOTION_TOKEN,
        NOTION_DATABASEID: process.env.NOTION_DATABASEID
    },
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "www.notion.so"
        },
        {
            protocol: "https",
            hostname: "prod-files-secure.s3.us-west-2.amazonaws.com"
        }
    ]
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
