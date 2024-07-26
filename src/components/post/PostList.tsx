"use client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostItem from "./PostItem";
import { PostListResultsProps } from "@/types/postList";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import React, { useEffect, useMemo, useState } from "react";

const getPageIndex = (page: number, page_size: number) => {
  const getEnd = page * page_size;
  const getStart = getEnd - page_size;

  return {
    start: getStart,
    end: getEnd,
  };
};

const PostList = ({
  posts,
  size,
  page = 1,
}: {
  posts: PageObjectResponse[];
  size: number;
  page?: number;
}) => {
  const pageStore = useSelector<RootState>(
    (state) => state.page.current,
  ) as number;
  const [postList, setPostList] = useState<PageObjectResponse[]>([]);

  const { start, end } = getPageIndex(pageStore, size);

  const slicedPostList = useMemo(() => {
    return posts.slice(start, end);
  }, [posts, start, end]);

  useEffect(() => {
    setPostList([...slicedPostList]);
  }, [slicedPostList])

  return (
    <ul className="mx-auto my-0 grid w-full max-w-[1320px] grid-cols-3 gap-5 semi-desktop:px-[20px]">
      {postList.map((post: PageObjectResponse & PostListResultsProps) => {
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
      })}
    </ul>
  );
};

export default PostList;
