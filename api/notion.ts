import { Client } from "@notionhq/client";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

export const totalPage = 2;

export const getPostList = async () => {
    const databaseId = process.env.NOTION_DATABASEID as string;
    
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "EXPOSURE",
                select: {
                    equals: "T"
                }
            },
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending"
                }
            ],
        });

        return {
            results: response.results,
            total: response.results.length,
            size: 6
        }

    } catch (error) {
        console.log(error)
    }

}

export const getCurrentPost = async (currentPostName: string) => {
    const databaseId = process.env.NOTION_DATABASEID as string;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "POSTNAME",
            rich_text: {
                equals: currentPostName
            }
        }
    })
    .then(
        (res) => res.results
    );

    return response;
}

export const getBlocks = async (id: string) => {
    const pageId = id;
    const { results } = await notion.blocks.children.list({
        block_id: pageId,
    });
    return results as BlockObjectResponse[];
}

export const getSearch = async (title:string) => {
    const query = title;

    const response = await notion.search({
        query: query,
        filter: {
          value: 'page',
          property: 'object'
        }
    })
    .then(
        (res) => res.results
    );

    return response as PageObjectResponse[];
}