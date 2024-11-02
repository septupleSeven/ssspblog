"use client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostItem from "./PostItem";
import { usedPostPropsType } from "@/app/types/post-types";
import { useSelector } from "react-redux";
import { RootStatePaging, RootStateSiteConfig } from "@/app/store/redux/store";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { validCateType } from "../../../../shared/types/api-types";
import { initialStatePaging, initialStateSiteConfig } from "@/app/types/slice-types";

const getPageIndex = (page: number, page_size: number) => {
  const getEnd = page * page_size;
  const getStart = getEnd - page_size;

  return {
    start: getStart,
    end: getEnd,
  };
};

const pathnameCondition = (pathname: string) => {
  if (pathname === "/search") return "search";
  return "home";
};

const PostList = ({
  posts,
  size,
  total,
  validCate,
  page = 1,
}: {
  posts: any[];
  size: number;
  total: number;
  validCate: validCateType[];
  page?: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getCate = searchParams.get("category");
  const currentPathname = pathnameCondition(pathname);
  const cateNames = validCate.map((cate) => cate.name)

  const paramCondition = getCate && cateNames.includes(getCate) ? true : false;

  const pagingStore = useSelector<RootStatePaging>(
    (state) => state.paging
  ) as Record<string, initialStatePaging>;

  const { start, end } = getPageIndex(
    paramCondition
      ? pagingStore.category.page
      : pagingStore[currentPathname].page,
    size,
  );

  const slicedPostList = useMemo(() => {
    return posts.slice(start, end);
  }, [posts, start, end]);
  
  const siteConfigStore = useSelector<RootStateSiteConfig>(
    (state) => state.siteConfig,
  ) as initialStateSiteConfig;
  const [listClassName, setListClassName] = useState<string>(siteConfigStore.config.listStyle as string);
  const listClassNameConfig:Record<string, string> = {
    gallery: "grid grid-cols-3 gap-5 semi-tab:grid-cols-2 semi-mobile:grid-cols-1",
    list: "grid grid-cols-1 gap-5",
  }

  useEffect(() => {
    setListClassName(siteConfigStore.config.listStyle);
  }, [siteConfigStore.config.listStyle])  

  return (
    <>
      <ul 
      className={`${listClassNameConfig[listClassName]} mx-auto my-0 w-full max-w-[1024px]`}
      >
        {slicedPostList.map(
          (post: PageObjectResponse) => {
            const { id, properties } = post;
            const { CATEGORY, TAG, NAME, OUTLINE, SLUG, THUMB } = properties as usedPostPropsType;

            if (!SLUG?.rich_text.length) {
              return <div key={id}>ERROR: SLUG is undefined</div>;
            }

            return (
              <PostItem
                key={id}
                slug={SLUG.rich_text[0]?.plain_text}
                thumb={
                  THUMB
                    ? THUMB.rich_text[0]?.plain_text : null
                }
                categories={CATEGORY?.multi_select}
                tags={TAG?.multi_select}
                title={NAME?.title[0].plain_text}
                outline={OUTLINE?.rich_text[0]?.plain_text}
                cateParam={paramCondition ? getCate : null}
                listStyle={listClassName}
              ></PostItem>
            );
          },
        )}
      </ul>
      <Pagination
        size={size}
        total={total}
        pathname={currentPathname}
        isCate={paramCondition}
      />
    </>
  );
};

export default PostList;
