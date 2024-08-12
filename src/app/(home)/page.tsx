import Container from "@/components/Container";
import PostList from "@/components/post/PostList";
import { getPostList } from "../../../api/notion";
import Searchbar from "@/components/Searchbar";
import { GetPostListProps } from "@/types/post";
import Pagination from "@/components/Pagination";
import StoreProvider from "@/components/StoreProvider";

export default async function Home() {
  // const getPosts = (await getPostList()) as PageObjectResponse[];
  // const getPosts = (await getPostList()) as any;
  const { results, total, size } = (await getPostList()) as GetPostListProps;
  
  return (
    <Container>
      <section className="w-full pb-[120px] pt-[80px] semi-desktop:px-[20px] semi-mobile:pb-[80px] semi-mobile:pt-[60px]">
        <Searchbar />
        <div className="mt-[40px]">
          <StoreProvider>
            <PostList posts={results} size={size} total={total} />
          </StoreProvider>
        </div>
      </section>
    </Container>
  );
}
