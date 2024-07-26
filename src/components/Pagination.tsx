"use client"
import { setCurrentGroupNext, setCurrentGroupPrev, setCurrentPage } from "@/lib/redux/slice";
import { PageDispatch, RootState } from "@/lib/redux/store";
import React from "react";
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
  const paginataionArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);
  const slicedPaginationArr = paginataionArr.slice(groupStore, groupStore + size);

  return (
    <div>
      {
        <button onClick={() => dispatch(setCurrentGroupPrev(size))}>이전</button>
      }
      <ul className="flex gap-x-[10px]">
        {slicedPaginationArr.map((pager, idx) => (
          <li key={idx} 
          className={pager === pageStore ? `text-red-600` : ""}
          >
            <button onClick={() => dispatch(setCurrentPage(pager))}>{pager}</button>
          </li>
        ))}
      </ul>
      {
        paginataionArr.length > (groupStore + size)
        ? <button onClick={() => dispatch(setCurrentGroupNext(size))}>다음</button>
        : null
      }
    </div>
  );
};

export default Pagination;
