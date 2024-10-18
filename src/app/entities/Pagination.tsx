"use client";
import {
  setPage,
  setGroup,
  setNextGroup,
  setPrevGroup,
  initialStatePaging,
  getPagingActionPayload,
} from "@/app/store/redux/slice";
import { PageDispatch, RootState } from "@/app/store/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({
  size,
  total,
  pathname,
  isCate,
}: {
  size: number;
  total: number;
  pathname: string;
  isCate: boolean;
}) => {
  const pagingStore = useSelector<RootState>((state) => state.paging) as Record<
    string,
    initialStatePaging
  >;

  const dispatch = useDispatch<PageDispatch>();

  const getKey = isCate ? "category" : pathname;

  useEffect(() => {
    const getPaging = sessionStorage.getItem("paging");

    if (getPaging) {
      const getPagingData = JSON.parse(getPaging);

      dispatch(
        setPage(
          getPagingActionPayload({
            option: "initalize",
            isCate: isCate,
            state: getPagingData,
            pathname: pathname,
            keyName: "page",
          }),
        ),
      );
      dispatch(
        setGroup(
          getPagingActionPayload({
            option: "initalize",
            isCate: isCate,
            state: getPagingData,
            pathname: pathname,
            keyName: "group",
          }),
        ),
      );
    }
  }, [dispatch, isCate, pathname]);

  const pageLength = Math.ceil(total / size);
  const pagerArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);

  const slicedPaginationArr = useMemo(() => {
    return pagerArr.slice(
      pagingStore[getKey].group,
      pagingStore[getKey].group + size,
    );
  }, [pagingStore, size, pagerArr, getKey]);

  const handlePrevGroup = () => {
    dispatch(
      setPrevGroup(
        getPagingActionPayload({
          option: "vanilla",
          isCate: isCate,
          val: size,
        }),
      ),
    );

    dispatch(
      setPage(
        getPagingActionPayload({
          option: "initalize",
          isCate: isCate,
          state: pagingStore,
          pathname: pathname,
          keyName: "group",
        }),
      ),
    );
  };

  const handleNextGroup = () => {
    dispatch(
      setNextGroup(
        getPagingActionPayload({
          option: "vanilla",
          isCate: isCate,
          val: size,
        }),
      ),
    );

    dispatch(
      setPage(
        getPagingActionPayload({
          option: "nextGroup",
          isCate: isCate,
          state: pagingStore,
          pathname: pathname,
          keyName: "group",
          size: size,
          val: 1,
        }),
      ),
    );
  };

  const Pager = React.memo(({ pager }: { pager: number }) => {
    return (
      <li
        className={
          pager === pagingStore[getKey].page
            ? "font-bold"
            : "font-normal opacity-40 duration-[0.3s] hover:opacity-100"
        }
      >
        <button
          onClick={() =>
            dispatch(
              setPage({
                isCategory: isCate,
                value: pager,
              }),
            )
          }
        >
          {pager}
        </button>
      </li>
    );
  });
  Pager.displayName = "Pager";

  return (
    <div className="mt-[40px] flex w-full items-center justify-center gap-x-[15px]">
      {!pagingStore[getKey].group ? null : (
        <button onClick={() => handlePrevGroup()}>
          <ChevronLeftIcon className="size-5" />
        </button>
      )}
      <ul className="flex gap-x-[15px] text-lg">
        {slicedPaginationArr.map((pager, idx) => (
          <Pager key={idx} pager={pager} />
        ))}
      </ul>
      {pagerArr.length > pagingStore[getKey].group + size ? (
        <button onClick={() => handleNextGroup()}>
          <ChevronRightIcon className="size-5" />
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
