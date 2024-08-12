import React from "react";
import { getCurrentPost } from "../../../../api/notion";
import Container from "@/components/Container";
import { NotionAPI } from "notion-client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PostListResultsProps } from "@/types/post";
import PostDetail from "@/components/post/PostDetail";
import PostDetailAnchor from "@/components/post/PostDetailAnchor";
import PostDetailBottom from "@/components/post/PostDetailBottom";
import StoreProvider from "@/components/StoreProvider";
const renderer = new NotionAPI();

const page = async ({ params }: { params: { id: string } }) => {
  const { current, indexInfo, prev, next } = await getCurrentPost(params.id);
  const currentPageId = current[0].id;

  const recordMap = await renderer.getPage(currentPageId);

  const { properties } = current[0] as PageObjectResponse &
    PostListResultsProps;
  const { CATEGORY, NAME, TAG } = properties;

  return (
    <Container>
      <section className="relative w-full pb-[120px] pt-[80px] semi-mobile:pb-[80px] semi-mobile:pt-[60px]">
        <div className="mx-auto my-0 max-w-[1024px] semi-desktop:px-[20px]">
          <div className="flex flex-col gap-y-[20px] border-b-2 border-primary-black pb-[30px] dark:border-primary-white">
            <div className="flex flex-col gap-y-[5px]">
              {CATEGORY?.multi_select?.length ? (
                <ul className="flex flex-wrap gap-x-[5px] gap-y-[5px] text-sm opacity-60">
                  {CATEGORY.multi_select.map((category, idx) => (
                    <li key={category.id}>
                      {CATEGORY?.multi_select?.length !== idx + 1
                        ? category.name + ","
                        : category.name}
                    </li>
                  ))}
                </ul>
              ) : null}
              <h1 className="text-3xl font-bold semi-tab:text-2xl semi-mobile:text-[1.375rem]">
                {NAME?.title[0].plain_text}
              </h1>
            </div>
            {TAG?.multi_select?.length ? (
              <ul className="flex flex-wrap gap-x-[5px] gap-y-[5px]">
                {TAG?.multi_select?.map((tag) => (
                  <li
                    key={tag.id}
                    className="rounded px-[5px] py-[3px] text-xs text-white bg-primary"
                  >
                    #{tag.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <PostDetail recordMap={recordMap} />
          <StoreProvider>
            <PostDetailBottom prev={prev} next={next} indexInfo={indexInfo}  />
          </StoreProvider>
        </div>
        <PostDetailAnchor recordMap={recordMap} />
      </section>
    </Container>
  );
};

export default page;
