import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostItemProps {
  postName: string;
  isExposure: string;
  title?: string;
  coverUrl?: string | null;
  categories?: {
    id: string;
    name: string;
    color?: string | null;
  }[];
  outline?: string;
}

const PostItem = (
  { 
    postName, title, coverUrl, categories, outline, isExposure
  }: PostItemProps
) => {
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

  if(isExposure === "F"){
    return null;
  }

  return (
    <li className="w-full overflow-hidden rounded-md dark:bg-primary-black">
      <Link href={`/posts/${postName}`}>
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
        <div className="flex flex-col px-[15px] py-[15px]">
          <div className="w-full overflow-hidden">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
              {title}
            </p>
          </div>
          {categories?.length ? (
            <ul className="flex gap-x-1">
              {categories.map((category) => {
                const cateColor = (
                  category.color ? category.color : "default"
                ) as keyof typeof cateColorPalette;
                return (
                  <li
                    key={category.id}
                    className={`${cateColorPalette[cateColor]} w-fit rounded-sm px-[4px] text-sm text-white`}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {outline?.length ? (
            <div>
              <p className="line-clamp-2 text-sm opacity-50">
                {outline}
              </p>
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
