import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

export type GetPostListProps = {
  results: PageObjectResponse[];
  total: number;
  size: number;
}

export type PostListResultsProps = {
  properties: {
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
    POSTNAME?: {
      type: "rich_text";
      rich_text: Array<RichTextItemResponse>;
    }
  }
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