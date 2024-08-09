"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { PageDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  initialStatePaging,
  setGroup,
  setPage,
  setSearchGroup,
  setSearchPage,
} from "@/lib/redux/slice";

const PostDetailBottom = ({
  prev,
  next,
  indexInfo,
}: {
  prev: {
    POSTNAME: string | null;
    NAME: string | null;
  };
  next: {
    POSTNAME: string | null;
    NAME: string | null;
  };
  indexInfo: {
    currentIndex: number;
    total: number;
    size: number;
  };
}) => {
  const pagingStore = useSelector<RootState>((state) => state.paging) as Record<
    string,
    initialStatePaging
  >;

  const { currentIndex, size } = indexInfo;

  const dispatch = useDispatch<PageDispatch>();

  useEffect(() => {
    const getPaging = sessionStorage.getItem("paging");

    if (getPaging) {
      const getPagingData = JSON.parse(getPaging);
      dispatch(setSearchPage(getPagingData.search.page));
      dispatch(setSearchGroup(getPagingData.search.group));
    }

    const getPageNum = Math.floor(currentIndex / size) + 1;
    const getGroupNum = Math.floor((getPageNum - 1) / size) * size;

    dispatch(setPage(getPageNum));
    dispatch(setGroup(getGroupNum));
  }, [dispatch, pagingStore, currentIndex, size]);

  return (
    <div>
      <div className="border-b-2 border-t-2 dark:border-primary-white">
        {prev.POSTNAME ? (
          <Link
            href={`/posts/${prev.POSTNAME}`}
            className="dark:border-primary-white-50 group flex items-center gap-x-[20px] border-b pb-[15px] pt-[15px]"
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
      <div className="flex w-full justify-end mt-[30px]">
        <Link href={`/`} className="px-[20px] py-[10px] text-lg rounded dark:bg-primary-black">
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default PostDetailBottom;
