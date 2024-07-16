import Container from "@/components/Container";
import PostList from "@/components/post/PostList";
import { getPostList } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Test from "@/components/Test";

export default async function Home() {

  const getPosts = await getPostList() as PageObjectResponse[];

  return (
    <Container>
      <section className="pb-[150px] pt-[80px] w-full">
        <Test />
        <PostList posts={getPosts} />
      </section>
    </Container>
  );
}