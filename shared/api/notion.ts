import {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./notion-sdk";
import {
  cacheDataType,
  cacheType,
  nearbyPostType,
  queryFilterType,
  isPropRichText,
  isPropTitle,
} from "../types/api-types";
import { pagingSize, validCate } from "../config/config";

const databaseId = process.env.NOTION_DATABASEID as string;
const cacheData: cacheType = {};

const getQueryOptions = (category?: string): QueryDatabaseParameters => {
  const filterOpt: queryFilterType =
    category && validCate.some((cate) => cate.name === category)
      ? { contains: category }
      : { is_not_empty: true };

  return {
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
          property: "CATEGORY",
          multi_select: {
            ...filterOpt,
          },
        },
      ],
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  };
};

export const getPostList = async (category?: string) => {
  const queryOptions = getQueryOptions(category);

  const response = await notion.databases.query(queryOptions);

  return {
    results: response.results as PageObjectResponse[],
    total: response.results.length,
    size: pagingSize,
  };
};

export const getCachedPostList = async (category?: string): Promise<cacheDataType> => {
  const currentTime = Date.now();

  let cateId: string;
  const getCate = validCate.find((cate) => cate.name === category);

  if (category && getCate) {
    cateId = getCate.id;
  } else {
    cateId = "ALL";
  }

  if (!cacheData[cateId]) {
    cacheData[cateId] = {
      data: {
        results: [],
        total: 0,
        size: pagingSize,
      },
      timestamp: 0,
      expiration: 100000,
    };
  }

  if (
    currentTime - cacheData[cateId].timestamp >
    cacheData[cateId].expiration
  ) {
    const postList = await getPostList(category);
    cacheData[cateId].data = postList;
    cacheData[cateId].timestamp = currentTime;
    return postList;
  } else {
    return cacheData[cateId].data;
  }
};

export const getPost = async (slug: string)  => {
  const postList = await getCachedPostList();
  const { results } = postList;

  const currentPost = results.find(
    (post) =>
      post.properties.SLUG &&
      isPropRichText(post.properties.SLUG) &&
      post.properties.SLUG.rich_text[0].plain_text === slug,
  );

  if (!currentPost) return false;

  const currentPostId = currentPost.id;
  const currentPostIndex = results.findIndex(
    (post) => post.id === currentPostId,
  );

  const nearbyPost: {
    [key: string]: nearbyPostType;
  } = {
    prev: {
      postSlug: null,
      postName: null,
    },
    next: {
      postSlug: null,
      postName: null,
    },
  };

  if (currentPostIndex > 0) {
    nearbyPost.prev = { ...getNearbyPost(results, currentPostIndex, "prev") };
  }

  if (currentPostIndex < results.length - 1) {
    nearbyPost.next = { ...getNearbyPost(results, currentPostIndex, "next") };
  }

  return {
    post: {
      current: currentPost,
      id: currentPostId,
      props: currentPost.properties,
    },
    paging: {
      currentIndex: currentPostIndex,
      total: results.length,
      size: pagingSize,
    },
    prev: { ...nearbyPost.prev },
    next: { ...nearbyPost.next },
  };
};

export const getNearbyPost = (
  results: PageObjectResponse[],
  index: number,
  direction: "prev" | "next",
) => {
  const config: nearbyPostType = {
    postSlug: null,
    postName: null,
  };

  if (index < 0) return config;

  let targetIdx = direction === "prev" ? index - 1 : index + 1;

  if (!results[targetIdx]) return config;

  const { SLUG, NAME } = results[targetIdx].properties;

  config.postSlug = isPropRichText(SLUG) ? SLUG.rich_text[0].plain_text : null;
  config.postName = isPropTitle(NAME) ? NAME.title[0].plain_text : null;

  return config;
};
