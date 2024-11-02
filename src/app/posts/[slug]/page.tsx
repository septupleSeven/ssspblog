import React from "react";
import Container from "@/app/widgets/Container";
import {
  generateMetaDataProp,
  usedPostPropsType,
} from "@/app/types/post-types";
import PostDetail from "@/app/posts/[slug]/ui/PostDetail";
import { Metadata } from "next";
import { getCachedPostList, getPost } from "../../../../shared/api/notion";
import { renderer } from "../../../../shared/api/notion-sdk";
import PostDetailBottom from "@/app/posts/[slug]/ui/PostDetailBottom";
import Empty from "@/app/widgets/Empty";
import { validCate } from "../../../../shared/config/config";
import PostDetailBtnWrapper from "./ui/PostDetailBtnWrapper";

export async function generateMetadata({
  params,
}: generateMetaDataProp): Promise<Metadata> {
  const currentPost = await getPost(params.slug);

  if (!currentPost) {
    return {
      title: "SS'sPBlog",
      description: "개인 블로그입니다.",
    };
  }

  const { post } = currentPost;
  const { props } = post;
  const { NAME } = props as usedPostPropsType;

  return {
    title: NAME?.title[0].plain_text,
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const currentPost = await getPost(params.slug);

  if (!currentPost) {
    return (
      <Container>
        <Empty />
      </Container>
    );
  }

  const { post, paging, prev, next } = currentPost;
  const { CATEGORY, NAME, TAG } = post.props as usedPostPropsType;

  const recordMap = await renderer.getPage(post.id);

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
                    className="rounded bg-primary px-[5px] py-[3px] text-xs text-white"
                  >
                    #{tag.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <PostDetail recordMap={recordMap} />

          <PostDetailBottom
            prev={prev}
            next={next}
            paging={paging}
            cate={validCate}
          />

          <PostDetailBtnWrapper recordMap={recordMap} />
          {/* <PostDetailAnchor recordMap={recordMap} /> */}
        </div>
      </section>
    </Container>
  );
};

export async function generateStaticParams() {
  const { results } = await getCachedPostList();

  const slugList = results.map((post) => {
    if (post.properties.SLUG.type === "rich_text") {
      return post.properties.SLUG.rich_text[0].plain_text;
    }
    return "";
  });

  return slugList.map((list) => ({ slug: list }));
}

export default page;
