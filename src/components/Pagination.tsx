"use client"
import { setPage, setGroup, setNextGroup, setPrevGroup, initialStatePaging } from "@/lib/redux/slice";
import { PageDispatch, RootState } from "@/lib/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({ 
  size, 
  total,
  pathname
}: { 
  size: number; 
  total: number;
  pathname: string;
}) => {
  const pagingStore = useSelector<RootState>(
    (state) => state.paging,
  ) as Record<string, initialStatePaging>;


  const dispatch = useDispatch<PageDispatch>();

  useEffect(() => {
    const getPaging = sessionStorage.getItem("paging");

    if(pathname && getPaging){
      const getPagingData = JSON.parse(getPaging);
      dispatch(setPage(getPagingData[pathname].page));
      dispatch(setGroup(getPagingData[pathname].group));
    }

  }, [dispatch, pathname, pagingStore]);
  
  const pageLength = Math.round(total / size);
  const pagerArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);

  const slicedPaginationArr = useMemo(() => {
    return pagerArr.slice(pagingStore[pathname].group, ((pagingStore[pathname].group) + size));
  },
  [pagingStore, pathname, size, pagerArr]
);

  const handlePrevGroup = () => {
    dispatch(setPrevGroup(size))
    dispatch(setPage(pagingStore[pathname].group))
  };

  const handleNextGroup = () => {
    dispatch(setNextGroup(size));
    dispatch(setPage(
      (pagingStore[pathname].group) + size + 1
    ));
  };

  const Pager = React.memo(({ pager }: { pager: number }) => {
    return (<li className={pager === 
    pagingStore[pathname].page 
    ? "font-bold" : "font-normal opacity-40 hover:opacity-100 duration-[0.3s]"}>
        <button onClick={() => {dispatch(setPage(pager))}}>{pager}</button>
      </li>)
  });
  Pager.displayName = "Pager";

  return (
    <div className="w-full flex justify-center items-center gap-x-[15px] mt-[40px]">
      {
        !pagingStore[pathname].group  
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
        pagerArr.length > (pagingStore[pathname].group + size)
        ? <button onClick={() => dispatch(handleNextGroup)}>
          <ChevronRightIcon className="size-5" />
        </button>
        : null
      }
    </div>
  );
};

export default Pagination;
