"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { PageDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/lib/redux/slice";

const PostDetailBottom = ({
  prev,
  next,
}: {
  prev: {
    POSTNAME: string | null;
    NAME: string | null;
  };
  next: {
    POSTNAME: string | null;
    NAME: string | null;
  };
}) => {
  const dispatch = useDispatch<PageDispatch>();

  useEffect(() => {
    const getPage = sessionStorage.getItem("page");

    if (getPage) {
      dispatch(setCurrentPage(Number(getPage)));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="border-b-2 border-t-2 dark:border-primary-white">
        {prev.POSTNAME ? (
          <Link
            href={`/posts/${prev.POSTNAME}`}
            className="group flex items-center gap-x-[20px] border-b pb-[15px] pt-[15px] dark:border-primary-white"
          >
            <ChevronUpIcon className="size-8" />
            <div className="flex w-full flex-col gap-y-[3px] overflow-hidden">
              <span className="text-sm opacity-50">이전 글</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium group-hover:underline">
                {prev.NAME}
              </span>
            </div>
          </Link>
        ) : null}
        {next.POSTNAME ? (
          <Link
            href={`/posts/${next.POSTNAME}`}
            className="group flex items-center gap-x-[20px] pb-[15px] pt-[15px]"
          >
            <ChevronDownIcon className="size-8" />
            <div className="flex flex-col gap-y-[3px] overflow-hidden">
              <span className="text-sm opacity-50">다음 글</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium group-hover:underline">
                {next.NAME}
              </span>
            </div>
          </Link>
        ) : null}
      </div>
      <Link href={`/`}>목록으로</Link>
    </div>
  );
};

export default PostDetailBottom;
