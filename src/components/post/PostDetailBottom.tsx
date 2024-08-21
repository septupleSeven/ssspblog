"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { PageDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  initialStatePaging,
  setCateGroup,
  setCatePage,
  setGroup,
  setPage,
  setSearchGroup,
  setSearchPage,
} from "@/lib/redux/slice";
import { useSearchParams } from "next/navigation";
import { validCate } from "../../../api/notion";

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
  const searchParams = useSearchParams();
  const getCate = searchParams.get("category");
  const paramCondition = getCate && validCate.includes(getCate) ? true : false;

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

      if(paramCondition){
        dispatch(setCatePage(getPagingData.category.page));
        dispatch(setCateGroup(getPagingData.category.group));
      }

    }

    const getPageNum = Math.floor(currentIndex / size) + 1;
    const getGroupNum = Math.floor((getPageNum - 1) / size) * size;

    dispatch(setPage({
      isCategory: false,
      value: getPageNum
    }));
    dispatch(setGroup({
      isCategory: false,
      value: getGroupNum
    }));
    
  }, [dispatch, pagingStore, currentIndex, size, paramCondition]);

  return (
    <div>
      <div className="border-b-2 border-t-2 border-primary-black dark:border-primary-white">
        {prev.POSTNAME ? (
          <Link
            href={`/posts/${prev.POSTNAME}`}
            className="border-primary-black-50 dark:border-primary-white-50 group flex items-center gap-x-[20px] border-b pb-[15px] pt-[15px]"
          >
            <ChevronUpIcon className="size-8 duration-[0.3s] group-hover:translate-y-[-5px]" />
            <div className="flex w-full flex-col gap-y-[3px] overflow-hidden">
              <span className="text-sm opacity-50 duration-[0.3s] group-hover:opacity-100">이전 글</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium duration-[0.3s] group-hover:underline group-hover:text-primary semi-mobile:text-base">
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
            <ChevronDownIcon className="size-8 duration-[0.3s] group-hover:translate-y-[5px]" />
            <div className="flex flex-col gap-y-[3px] overflow-hidden">
              <span className="text-sm opacity-50 duration-[0.3s] group-hover:opacity-100">다음 글</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium duration-[0.3s] group-hover:underline group-hover:text-primary semi-mobile:text-base">
                {next.NAME}
              </span>
            </div>
          </Link>
        ) : null}
      </div>
      <div className="flex w-full justify-end mt-[30px]">
        <Link href={`/`} className="px-[20px] py-[10px] flex justify-center items-center text-lg text-white text-center rounded duration-[0.3s] bg-primary semi-mobile:w-full semi-mobile:text-base">
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default PostDetailBottom;
