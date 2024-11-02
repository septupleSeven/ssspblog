import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

export type GetPostListProps = {
  results: PageObjectResponse[];
  total: number;
  size: number;
}

export type usedPostPropsType = {
  CATEGORY?: {
    type: "multi_select";
    multi_select?: {
      id: string;
      name: string;
      color: SelectColor
    }[]
  },
  TAG?: {
    type: "multi_select";
    multi_select?: {
      id: string;
      name: string;
      color: SelectColor
    }[]
  },
  NAME?: {
    type: "title";
    title: Array<RichTextItemResponse>
  },
  OUTLINE?: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
  },
  SLUG?: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
  },
  THUMB?: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
  }
};

export type generateMetaDataProp = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface PostItemProps {
  slug: string;
  title?: string;
  thumb?: string | null;
  categories?: {
    id: string;
    name: string;
    color?: string | null;
  }[];
  tags?: {
    id: string;
    name: string;
    color?: string | null;
  }[];
  outline?: string;
  cateParam: string | null;
  listStyle: string;
}