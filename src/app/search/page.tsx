import Container from "@/app/widgets/Container";
import React from "react";
import { getCachedPostList } from "../../../shared/api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetPostListProps, usedPostPropsType } from "@/app/types/post-types";
import PostList from "@/app/entities/post-list/PostList";
import Empty from "@/app/widgets/Empty";
import StoreProvider from "@/app/widgets/StoreProvider";
import { validCate } from "../../../shared/config/config";

const getFitsPost = (keywords: string, postTitle: string) => {
  if (!postTitle) return false;

  const escapedText = keywords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");

  return regex.test(postTitle);
};

const getSearchedPost = async (keyword: string) => {
  if (!keyword) return false;

  const { results, size } = (await getCachedPostList()) as GetPostListProps;

  const postInfo: PageObjectResponse[] = results.filter(
    (post: PageObjectResponse) => {
      const props: usedPostPropsType = post.properties;
      return getFitsPost(keyword, props.NAME?.title[0].plain_text!);
    },
  );

  return {
    results: postInfo,
    total: postInfo.length,
    size: size,
  };
};

const page = async ({
  searchParams,
}: {
  searchParams: { keyword: string };
}) => {
  const { results, total, size } = (await getSearchedPost(
    searchParams.keyword,
  )) as GetPostListProps;

  if (!results) {
    return (
      <Container>
        <div>forbidden</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <section
          className={`w-full semi-desktop:px-[20px] ${total ? "pb-[150px] pt-[80px]" : ""}`}
        >
          {total ? (
            <PostList
              posts={results}
              size={size}
              total={total}
              validCate={validCate}
              page={1}
            />
          ) : (
            <Empty title="검색 결과가 없습니다." />
          )}
        </section>
      </Container>
    );
  }
};

export default page;
