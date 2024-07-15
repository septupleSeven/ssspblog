import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

export const getPostList = async () => {
    const databaseId = process.env.NOTION_DATABASEID as string;
    const response = await notion.databases.query({
        database_id: databaseId
    })
    .then(
        (res) => res.results
    );

  return response;
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