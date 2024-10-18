"use client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostItem from "./PostItem";
import { usedPostPropsType } from "@/app/types/post-types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/redux/store";
import React, { useMemo } from "react";
import { initialStatePaging } from "@/app/store/redux/slice";
import Pagination from "../Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { validCateType } from "../../../../shared/types/api-types";

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

  const pagingStore = useSelector<RootState>((state) => state.paging) as Record<
    string,
    initialStatePaging
  >;

  const { start, end } = getPageIndex(
    paramCondition
      ? pagingStore.category.page
      : pagingStore[currentPathname].page,
    size,
  );

  const slicedPostList = useMemo(() => {
    return posts.slice(start, end);
  }, [posts, start, end]);

  return (
    <>
      <ul className="mx-auto my-0 grid w-full max-w-[1024px] grid-cols-3 gap-5 semi-tab:grid-cols-2 semi-mobile:grid-cols-1">
        {slicedPostList.map(
          (post: PageObjectResponse) => {
            const { id, properties, cover } = post;
            const { CATEGORY, TAG, NAME, OUTLINE, SLUG } = properties as usedPostPropsType;

            if (!SLUG?.rich_text.length) {
              return <div key={id}>ERROR: SLUG is undefined</div>;
            }

            return (
              <PostItem
                key={id}
                slug={SLUG.rich_text[0]?.plain_text}
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
                cateParam={paramCondition ? getCate : null}
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
