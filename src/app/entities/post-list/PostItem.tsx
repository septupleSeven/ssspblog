"use client";
import { PostItemProps } from "@/app/types/post-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostItem = React.memo(
  ({
    slug,
    title,
    thumb,
    categories,
    tags,
    outline,
    cateParam,
    listStyle
  }: PostItemProps) => {
    let getCateParam = "";

    const listClassNameConfig:Record<string, {
      li: string;
      link: string;
      figure: string;
    }> = {
      gallery: {
        li: "bg-white dark:bg-primary-black dark:hover:bg-primary-black-deep",
        link: "block h-full",
        figure: "",
      },
      list: {
        li: "dark:bg-primary-black dark:hover:bg-primary-black-deep",
        link: "grid grid-cols-[270px_1fr] semi-tab:grid-cols-[200px_1fr] semi-mobile:block",
        figure: "h-full semi-mobile:hidden",
      },
    }

    return (
      <li className={`group w-full overflow-hidden shadow-reg rounded-md ${listClassNameConfig[listStyle].li} duration-[0.3s]`}>
        <Link
          href={`/posts/${slug}${getCateParam}`}
          className={`${listClassNameConfig[listStyle].link}`}
          prefetch={true}
        >
          <figure className={`flex ${listClassNameConfig[listStyle].figure} relative aspect-video w-full items-center justify-center overflow-hidden`}>
            <Image
              src={thumb ? `/image/thumb/${thumb}.jpg` : "/image/thumbnail404.jpg"}
              alt="cover"
              width={0}
              height={0}
              fill={true}
              sizes={"(max-width: 100px) 100vw, 100vw"}
              style={{
                objectFit: thumb ? "cover" : `contain`,
              }}
              priority={true}
            ></Image>
          </figure>
          <div className="flex flex-col gap-y-[10px] px-[15px] pb-[20px] pt-[15px]">
            <div className="flex flex-col gap-y-[5px]">
              <div className="w-full overflow-hidden">
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium duration-[0.3s] group-hover:text-primary semi-desktop:text-lg">
                  {title}
                </p>
              </div>
              {outline?.length ? (
                <div>
                  <p className="line-clamp-2 text-sm opacity-50 duration-[0.3s] group-hover:opacity-100">
                    {outline}
                  </p>
                </div>
              ) : null}
            </div>
            {categories?.length ? (
              <ul className="flex gap-x-1">
                {categories.map((category) => {
                  return (
                    <li
                      key={category.id}
                      className="w-fit rounded bg-primary px-[5px] py-[3px] text-xs text-white"
                    >
                      #{category.name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </Link>
      </li>
    );
  },
);
PostItem.displayName = "PostItem";

export default PostItem;
