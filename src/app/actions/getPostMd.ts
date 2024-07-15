import { Client } from "@notionhq/client";
// import { NotionToMarkdown } from "notion-to-md";

export default async function getPostMd(pageId:any) {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    // const n2m = new NotionToMarkdown({notionClient: notion});

    // const mdBlocks = await n2m.pageToMarkdown(pageId);
    // const mdString = n2m.toMarkdownString(mdBlocks);

    // return mdString;
    return notion;
}