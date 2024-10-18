import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const renderer = new NotionAPI();

export const databaseId = process.env.NOTION_DATABASEID as string;
