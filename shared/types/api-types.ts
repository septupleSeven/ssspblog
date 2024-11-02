import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export type queryFilterType = {
    contains: string
  } | {
    is_not_empty: true;
}

export type cacheDataType = {
  results: PageObjectResponse[],
  total: number,
  size: number
}

export type cacheType = {
  [key: string] : {
    data: cacheDataType,
    timestamp: number,
    expiration: number
  }
}

export type validCateType = {
  id: string,
  name: string
}

export type siteConfigType = {
  id: string,
  name: string,
  base?: string,
  values: Array<{name: string, val:string}>
}

export type siteConfigValType = siteConfigType[]

export type nearbyPostType = {
  postSlug: string | null;
  postName: string | null;
};

export function isPropRichText(props: any): props is {
  type: "rich_text";
  rich_text: Array<RichTextItemResponse>;
  id: string;
} {
  return props.type === "rich_text";
}

export function isPropTitle(props: any): props is {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
} {
  return props.type === "title";
}