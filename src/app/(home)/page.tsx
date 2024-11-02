import Container from "@/app/widgets/Container";
import PostList from "@/app/entities/post-list/PostList";
import { getCachedPostList } from "../../../shared/api/notion";
import Searchbar from "@/app/entities/Searchbar";
import Categories from "@/app/entities/Categories";
import { validCate } from "../../../shared/config/config";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { results, total, size } = await getCachedPostList(searchParams.category);
  return (
    <Container>
      <section className="w-full pb-[120px] pt-[80px] semi-desktop:px-[20px] semi-mobile:pb-[80px] semi-mobile:pt-[60px]">
        <div>
            <Searchbar />
            <Categories total={total} validCate={validCate} />
            <PostList 
            posts={results} 
            size={size} 
            total={total} 
            validCate={validCate}
            />
        </div>
      </section>
    </Container>
  );
}
