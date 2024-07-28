"use client"
import { setCurrentGroupNext, setCurrentGroupPrev, setCurrentPage } from "@/lib/redux/slice";
import { PageDispatch, RootState } from "@/lib/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({ size, total }: { size: number; total: number }) => {
  const pageStore = useSelector<RootState>(
    (state) => state.page.current,
  ) as number;

  const groupStore = useSelector<RootState>(
    (state) => state.group.current,
  ) as number;

  const dispatch = useDispatch<PageDispatch>();
  
  const pageLength = Math.round(total / size);
  const pagerArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);

  const slicedPaginationArr = useMemo(() => {
    return pagerArr.slice(groupStore, groupStore + size);
  },[groupStore, size, pagerArr]);

  const handlePrevGroup = () => {
    dispatch(setCurrentGroupPrev(size));
    dispatch(setCurrentPage(groupStore));
  };

  const handleNextGroup = () => {
    dispatch(setCurrentGroupNext(size));
    dispatch(setCurrentPage(groupStore + size + 1));
  };

  const Pager = React.memo(({ pager }: { pager: number }) => {
    return (<li className={pager === pageStore ? "font-bold" : "font-normal opacity-40"}>
        <button onClick={() => dispatch(setCurrentPage(pager))}>{pager}</button>
      </li>)
  });
  Pager.displayName = "Pager";

  return (
    <div className="w-full flex justify-center items-center gap-x-[15px] mt-[30px]">
      {
        !groupStore  
        ? null
        : <button onClick={() => dispatch(handlePrevGroup)}>
          <ChevronLeftIcon className="size-5" />
        </button>
      }
      <ul className="flex gap-x-[15px] text-lg">
        {slicedPaginationArr.map(
          (pager, idx) => (<Pager key={idx} pager={pager} />)
        )}
      </ul>
      {
        pagerArr.length > (groupStore + size)
        ? <button onClick={() => dispatch(handleNextGroup)}>
          <ChevronRightIcon className="size-5" />
        </button>
        : null
      }
    </div>
  );
};

export default Pagination;
