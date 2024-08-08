import Container from "@/components/Container";
import React from "react";
import { getPostList } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetPostListProps, PostListResultsProps } from "@/types/post";
import PostList from "@/components/post/PostList";
import Empty from "@/components/Empty";
import Pagination from "@/components/Pagination";
import StoreProvider from "@/components/StoreProvider";

const getFitsPost = (keywords: string, postTitle: string) => {
  if (!postTitle) return false;

  const escapedText = keywords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");

  return regex.test(postTitle);
};

const getSearchedPost = async (keyword: string) => {
  if (!keyword) return false;

  const { results, size } = (await getPostList()) as GetPostListProps;

  const postInfo: PageObjectResponse[] = results.filter(
    (post: PageObjectResponse & PostListResultsProps) =>
      getFitsPost(keyword, post.properties.NAME?.title[0].plain_text!),
  );

  return {
    results: postInfo,
    total: postInfo.length,
    size: size
  };
};

const page = async ({
  searchParams,
}: {
  searchParams: { keyword: string };
}) => {
  const { results, total, size } = await getSearchedPost(searchParams.keyword) as GetPostListProps;

  if (!results) {
    return (
      <Container>
        <div>forbidden</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <section className="w-full pb-[150px] pt-[80px] semi-desktop:px-[20px]">
          {total ? (
            <StoreProvider>
              <PostList posts={results} size={size} total={total} page={1} />
              {/* <Pagination size={size} total={total} /> */}
            </StoreProvider>
          ) : (
            <Empty title="검색 결과가 없습니다." />
          )}
        </section>
      </Container>
    );
  }
};

export default page;
