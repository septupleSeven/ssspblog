import Container from "@/components/Container";
import React from "react";
import { getPostList, getSearch } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PostListProps } from "@/types/postList";
import PostList from "@/components/post/PostList";
import Empty from "@/components/Empty";

const getFitsPost = (keywords: string, postTitle: string) => {
  if (!postTitle) return false;

  const escapedText = keywords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");

  return regex.test(postTitle);
};

const getSearchedPost = async (keyword: string) => {
  if (!keyword) return false;

  const postList = await getPostList();

  const postInfo: PageObjectResponse[] = postList.filter(
    (post: PageObjectResponse & PostListProps) =>
      getFitsPost(keyword, post.properties.NAME?.title[0].plain_text!),
  );

  if (!postInfo.length) return "empty";

  return postInfo;
};

const page = async ({
  searchParams,
}: {
  searchParams: { keyword: string };
}) => {
  const searchedPost = await getSearchedPost(searchParams.keyword);

  if (!searchedPost) {
    return (
      <Container>
        <div>forbidden</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <section className="w-full pb-[150px] pt-[80px]">
          {!(searchedPost === "empty") ? (
            <PostList posts={searchedPost} />
          ) : (
            <Empty title="검색 결과가 없습니다."/>
          )}
        </section>
      </Container>
    );
  }
};

export default page;
