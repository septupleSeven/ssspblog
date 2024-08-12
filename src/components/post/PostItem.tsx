"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostItemProps {
  postName: string;
  title?: string;
  coverUrl?: string | null;
  categories?: {
    id: string;
    name: string;
    color?: string | null;
  }[];
  tags?: {
    id: string;
    name: string;
    color?: string | null;
  }[];
  outline?: string;
}

const PostItem = React.memo(
  ({ postName, title, coverUrl, categories, tags, outline }: PostItemProps) => {
    const cateColorPalette = {
      default: "black",
      gray: "bg-notion-gray",
      brown: "bg-notion-brown",
      orange: "bg-notion-orange",
      yellow: "bg-notion-yellow",
      green: "bg-notion-green",
      blue: "bg-notion-blue",
      purple: "bg-notion-purple",
      pink: "bg-notion-pink",
      red: "bg-notion-red",
    };

    return (
      <li className="group w-full overflow-hidden rounded-md bg-white shadow-reg duration-[0.3s] dark:bg-primary-black dark:hover:bg-primary-black-deep">
        <Link href={`/posts/${postName}`} className="block h-full">
          <figure className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-fuchsia-700">
            <Image
              src={coverUrl ? coverUrl : "/image/thumbnail404.png"}
              alt="cover"
              fill={true}
              style={{
                objectFit: coverUrl ? "cover" : `contain`,
              }}
            ></Image>
          </figure>
          <div className="flex flex-col gap-y-[10px] px-[15px] pb-[20px] pt-[15px]">
            <div className="flex flex-col gap-y-[5px]">
              <div className="w-full overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium duration-[0.3s] group-hover:text-primary semi-desktop:text-lg">
                  {title}
                </p>
              </div>
              {tags?.length ? (
                <ul className="flex gap-x-1">
                  {tags.map((tag) => {
                    return (
                      <li
                        key={tag.id}
                        className="w-fit rounded bg-primary px-[5px] py-[3px] text-xs text-white"
                      >
                        #{tag.name}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
            {outline?.length ? (
              <div>
                <p className="line-clamp-2 text-sm opacity-50 duration-[0.3s] group-hover:opacity-100">{outline}</p>
              </div>
            ) : null}
          </div>
        </Link>
      </li>
    );
  },
);
PostItem.displayName = "PostItem";

export default PostItem;
