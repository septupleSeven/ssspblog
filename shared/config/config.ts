import { siteConfigValType, validCateType } from "../types/api-types";

export const validCate: validCateType[] = [
  {
    id: "UIUX",
    name: "UI/UX",
  },
  {
    id: "ETC",
    name: "기타",
  },
  {
    id: "MAKP",
    name: "제작기",
  },
];

export const siteConfigVal:siteConfigValType = [
  {
    id: "listStyle",
    name: "목록 스타일",
    base: "gallery",
    values: [
      {
        name: "갤러리",
        val: "gallery"
      }, {
        name: "리스트",
        val: "list"
      }
    ]
  },
  {
    id: "fontSize",
    name: "글자 크기",
    base: "16",
    values: [
      {
        name: "18px",
        val: "18px"
      },
      {
        name: "17px",
        val: "17px"
      },
      {
        name: "16px",
        val: "16px"
      },
      {
        name: "15px",
        val: "15px"
      },
      {
        name: "14px",
        val: "14px"
      },
    ]
  },
  {
    id: "activeBookmarkBtn",
    name: "북마크 버튼",
    base: "T",
    values: [
      {
        name: "사용",
        val: "T"
      }, {
        name: "사용 안함",
        val: "F"
      }
    ]
  },
  {
    id: "activeScrollTopBtn",
    name: "맨 위로 버튼",
    base: "T",
    values: [
      {
        name: "사용",
        val: "T"
      }, {
        name: "사용 안함",
        val: "F"
      }
    ]
  },
];

export const pagingSize = 6;
