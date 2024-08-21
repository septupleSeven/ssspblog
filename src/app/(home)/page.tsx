import Container from "@/components/Container";
import PostList from "@/components/post/PostList";
import { getPostList, validCate } from "../../../api/notion";
import Searchbar from "@/components/Searchbar";
import { GetPostListProps } from "@/types/post";
import StoreProvider from "@/components/StoreProvider";
import Categories from "@/components/Categories";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { results, total, size } = (await getPostList(
    searchParams?.category,
  )) as GetPostListProps;

  return (
    <Container>
      <section className="w-full pb-[120px] pt-[80px] semi-desktop:px-[20px] semi-mobile:pb-[80px] semi-mobile:pt-[60px]">
        <div>
          <StoreProvider>
            <Searchbar />
            <Categories total={total} validCate={validCate} />
            <PostList posts={results} size={size} total={total} validCate={validCate} />
          </StoreProvider>
        </div>
      </section>
    </Container>
  );
}
