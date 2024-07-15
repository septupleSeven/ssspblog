import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostItem from "./PostItem";
import { PostListProps } from "@/types/postList";

const PostList = (
  {posts}: { posts: PageObjectResponse[] }
) => {

  return (
    <ul className="mx-auto my-0 grid w-full max-w-[1320px] grid-cols-3 gap-5 semi-desktop:px-[20px]">
      {posts.map((
        post: PageObjectResponse & PostListProps
      ) => {

        const { id, properties, cover } = post;
        const { CATEGORY, NAME, OUTLINE, EXPOSURE, POSTNAME } = properties
        
        if(!POSTNAME?.rich_text || !EXPOSURE?.select){
          return (
          <div key={id}>
            ERROR: POSTNAME&#40;or EXPOSURE&#41; is undefined
          </div>
        );
        }

        return (
          <PostItem
            key={id}
            postName={POSTNAME.rich_text[0]?.plain_text}
            coverUrl={
              cover
                ? cover.type === "file"
                  ? cover.file.url
                  : cover.external.url
                : null
            }
            categories={CATEGORY?.multi_select}
            title={NAME?.title[0].plain_text}
            outline={OUTLINE?.rich_text[0]?.plain_text}
            isExposure={EXPOSURE.select.name}
          ></PostItem>
        );
      })}
    </ul>
  );
};

export default PostList;
