import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";

export type PostListProps = {
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
    EXPOSURE?: {
      type: "select";
      select: {
        name: string;
        color: SelectColor
      };
    }
    POSTNAME?: {
      type: "rich_text";
      rich_text: Array<RichTextItemResponse>;
    }
  }
};



