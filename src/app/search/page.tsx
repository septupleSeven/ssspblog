import Container from "@/components/Container";
import React from "react";
import { getPostList, getSearch } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PostListProps } from "@/types/postList";
import PostList from "@/components/post/PostList";

type postInfoProps = {
    title?: string | null
    id: string
}

const getPostTitle = async () => {
  const postList = await getPostList();
  const postInfo:postInfoProps[] = postList.map(
    (post: PageObjectResponse & PostListProps) => {
        return {
            title: post.properties.NAME?.title[0].plain_text,
            id: post.id
        }
    }
  );

  return postInfo;
};

const getSearchedPostInfo = async (keywords: string) => {
  const postInfo = await getPostTitle();

  const escapedText = keywords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");

  const filteredPost = postInfo.filter((post:postInfoProps) => {
    return regex.test(post.title ? post.title : "")
  });

  return filteredPost;
};

const getSearchedPost = async (
    postInfo: postInfoProps[]
) => {

    const searchedPost = new Array();

    for(let i = 0; i < postInfo.length; i++){
        const search = await getSearch(postInfo[i].title as string);
        searchedPost.push(search[0]);
    }

    return searchedPost as PageObjectResponse[];

}

const page = async (
  // zzz:any
  { searchParams }: { searchParams: { query: string } },
) => {
  const searchedPostTitle = await getSearchedPostInfo(searchParams.query);
  const test = await getSearchedPost(searchedPostTitle);

  return (
    <Container>
      {/* <div>zzz</div> */}
      <PostList posts={test} />
    </Container>
  );
};

export default page;
