import Container from "@/components/Container";
import PostList from "@/components/post/PostList";
import { getPostList } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function Home() {

  const getPosts = await getPostList() as PageObjectResponse[];

  return (
    <Container>
      <section className="pb-[150px] pt-[80px] w-full">
        <PostList posts={getPosts} />
      </section>
    </Container>
  );
}