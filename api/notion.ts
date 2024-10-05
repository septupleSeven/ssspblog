import { GetPostListProps, isPropRichText, isPropTitle, PostListResultsProps } from "@/types/post";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const pagingSize = 6;

export const validCate = [ "UI/UX", "제작기", "기타" ];

export const getPostList = async (
  category?: string
) => {

  const databaseId = process.env.NOTION_DATABASEID as string;

  type filterOptType = {
    contains: string
  } | {
    is_not_empty: true;
  }

  const filterOpt:filterOptType = (category && validCate.includes(category)) 
  ? {
    contains: category
  } : {
    is_not_empty: true
  }
  
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "EXPOSURE",
        select: {
          equals: "T",
        },
        and: [
          {
            property: "CATEGORY",
            multi_select: {
              ...filterOpt
            }
          }, 
        ]
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ]
    });

    return {
      results: response.results,
      total: response.results.length,
      size: pagingSize,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentPost = async (currentPostName: string) => {
  const databaseId = process.env.NOTION_DATABASEID as string;

  const { results } = (await getPostList()) as GetPostListProps;

  const postResults = await notion.databases
    .query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "EXPOSURE",
            select: {
              equals: "T",
            },
          },
          {
            property: "POSTNAME",
            rich_text: {
              equals: currentPostName,
            },
          },
        ],
      },
    })
    .then((res) => res.results);

  const currentPost = postResults[0] as PageObjectResponse & PostListResultsProps;
  const currentPostId = postResults[0].id;
  const currentPostIndex = results.findIndex((el) => el.id === currentPostId);

  type nearbyPostType = {
    POSTNAME: string | null;
    NAME: string | null;
  };

  const nearbyPost: {
    prev: nearbyPostType;
    next: nearbyPostType;
  } = {
    prev: {
      POSTNAME: "",
      NAME: "",
    },
    next: {
      POSTNAME: "",
      NAME: "",
    },
  };

  if (currentPostIndex > 0) {
    const prevPostName = results[currentPostIndex - 1].properties.POSTNAME;
    nearbyPost.prev.POSTNAME = isPropRichText(prevPostName)
      ? (prevPostName.rich_text[0].plain_text as string)
      : null;

    const prevName = results[currentPostIndex - 1].properties.NAME;
    nearbyPost.prev.NAME = isPropTitle(prevName)
      ? (prevName.title[0].plain_text as string)
      : null;
  }

  if (currentPostIndex < results.length - 1) {
    const nextPostName = results[currentPostIndex + 1].properties.POSTNAME;
    nearbyPost.next.POSTNAME = isPropRichText(nextPostName)
      ? nextPostName.rich_text[0].plain_text
      : null;

    const nextName = results[currentPostIndex + 1].properties.NAME;
    nearbyPost.next.NAME = isPropTitle(nextName)
      ? nextName.title[0].plain_text
      : null;
  }

  return {
    post: {
      current: postResults[0],
      postId: currentPostId,
      props: currentPost.properties
    },
    indexInfo: {
      currentIndex: currentPostIndex,
      total: results.length,
      size: pagingSize,
    },
    ...nearbyPost,
  };
};

export const getBlocks = async (id: string) => {
  const pageId = id;
  const { results } = await notion.blocks.children.list({
    block_id: pageId,
  });
  return results as BlockObjectResponse[];
};

export const getSearch = async (title: string) => {
  const query = title;

  const response = await notion
    .search({
      query: query,
      filter: {
        value: "page",
        property: "object",
      },
    })
    .then((res) => res.results);

  return response as PageObjectResponse[];
};
