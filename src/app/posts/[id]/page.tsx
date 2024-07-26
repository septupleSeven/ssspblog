import React from "react";
import { getBlocks, getCurrentPost } from "../../../../api/notion";
import Container from "@/components/Container";
import { NotionRenderer } from "@notion-render/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostListResultsProps } from "@/types/postList";

const renderer = new NotionRenderer();
const getRenderedBlocks = async (blocks: BlockObjectResponse[]) => {
  const html = renderer.render(...blocks);
  return html;
};

const page = async ({ params }: { params: { id: string } }) => {
  const currentPageRes = await getCurrentPost(params.id);
  const currentPageId = currentPageRes[0].id;

  const currentBlocks = await getBlocks(currentPageId);
  const getNodeData = await getRenderedBlocks(currentBlocks);

  const { properties } = currentPageRes[0] as PageObjectResponse &
  PostListResultsProps;
  const { CATEGORY, NAME, OUTLINE, EXPOSURE, POSTNAME, TAG } = properties;

  return (
    <Container>
      <section className="w-full pb-[150px] pt-[80px]">
        <div className="mx-auto my-0 max-w-[1320px] semi-desktop:px-[20px]">
          <div className="flex flex-col gap-y-[20px] border-b-2 border-black pb-[30px] dark:border-primary-white">
            <div className="flex flex-col gap-y-[5px]">
              {CATEGORY?.multi_select?.length ? (
                <ul className="flex gap-x-[5px] text-sm opacity-60">
                  {CATEGORY.multi_select.map((category, idx) => (
                    <li key={category.id}>
                      {CATEGORY?.multi_select?.length !== idx + 1
                        ? category.name + ","
                        : category.name}
                    </li>
                  ))}
                </ul>
              ) : null}
              <h1 className="text-3xl font-medium">
                {NAME?.title[0].plain_text}
              </h1>
            </div>
            {TAG?.multi_select?.length ? (
              <ul className="flex gap-x-[5px]">
                {TAG?.multi_select?.map((tag) => (
                  <li
                    key={tag.id}
                    className="rounded px-[5px] py-[3px] text-xs dark:bg-primary-black"
                  >
                    #{tag.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div
            className="pt-[30px]"
            dangerouslySetInnerHTML={{ __html: getNodeData }}
          ></div>
        </div>
      </section>
    </Container>
  );
};

export default page;
