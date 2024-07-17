import Container from "@/components/Container";
import React from "react";
import { getPostList, getSearch } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PostListProps } from "@/types/postList";
import PostList from "@/components/post/PostList";

const getSearchedPost = async (keyword: string) => {
  const postList = await getPostList();

  const postInfo: PageObjectResponse[] = postList.filter(
    (post: PageObjectResponse & PostListProps) =>
      getFitsPost(keyword, post.properties.NAME?.title[0].plain_text!),
  );

  return postInfo;
};

const getFitsPost = (keywords: string, postTitle: string) => {
  if (!postTitle) return false;

  const escapedText = keywords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");

  return regex.test(postTitle);
};

const page = async ({ searchParams }: { searchParams: { query: string } }) => {
  const searchedPost = await getSearchedPost(searchParams.query);

  return (
    <Container>
      <PostList posts={searchedPost} />
    </Container>
  );
};

export default page;
