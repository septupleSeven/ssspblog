import Container from "@/components/Container";
import PostList from "@/components/post/PostList";
import { getPostList } from "../../../api/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Searchbar from "@/components/Searchbar";

export default async function Home() {
  const getPosts = (await getPostList()) as PageObjectResponse[];

  return (
    <Container>
      <section className="w-full pb-[150px] pt-[80px]">
        <Searchbar />
        <div className="mt-[40px]">
          <PostList posts={getPosts} />
        </div>
      </section>
    </Container>
  );
}
