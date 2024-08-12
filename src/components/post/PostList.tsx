"use client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostItem from "./PostItem";
import { PostListResultsProps } from "@/types/post";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import React, { useEffect, useMemo, useState } from "react";
import { initialStatePaging } from "@/lib/redux/slice";
import Pagination from "../Pagination";
import { usePathname } from "next/navigation";

const getPageIndex = (page: number, page_size: number) => {
  const getEnd = page * page_size;
  const getStart = getEnd - page_size;

  return {
    start: getStart,
    end: getEnd,
  };
};

const pathnameCondition = (pathname:string) => {
  if(pathname === "/search") return "search";
  return "home";
};

const PostList = ({
  posts,
  size,
  total,
  page = 1,
}: {
  posts: PageObjectResponse[];
  size: number;
  total: number;
  page?: number;
}) => {
  const pathname = usePathname();
  const currentPathname = pathnameCondition(pathname);

  const pagingStore = useSelector<RootState>(
    (state) => state.paging,
  ) as Record<string, initialStatePaging>;

  const { start, end } = getPageIndex(pagingStore[currentPathname].page, size);

  const slicedPostList = useMemo(() => {
    return posts.slice(start, end);
  }, [posts, start, end]);

  return (
    <>
      <ul className="mx-auto my-0 grid w-full max-w-[1024px] grid-cols-3 gap-5 semi-tab:grid-cols-2 semi-mobile:grid-cols-1">
        {slicedPostList.map(
          (post: PageObjectResponse & PostListResultsProps) => {
            const { id, properties, cover } = post;
            const { CATEGORY, TAG, NAME, OUTLINE, POSTNAME } = properties;

            if (!POSTNAME?.rich_text.length) {
              return <div key={id}>ERROR: POSTNAME is undefined</div>;
            }

            return (
              <PostItem
                key={id}
                postName={POSTNAME.rich_text[0]?.plain_text}
                coverUrl={
                  cover
                    ? cover.type === "file"
                      ? cover.file.url
                      : cover.external.url
                    : null
                }
                categories={CATEGORY?.multi_select}
                tags={TAG?.multi_select}
                title={NAME?.title[0].plain_text}
                outline={OUTLINE?.rich_text[0]?.plain_text}
              ></PostItem>
            );
          },
        )}
      </ul>
      <Pagination size={size} total={total} pathname={currentPathname} />
    </>
  );
};

export default PostList;
