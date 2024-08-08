"use client"
import { setCurrentGroup, setCurrentGroupNext, setCurrentGroupPrev, setCurrentPage, setPage, setCurrentType, setGroup, setNextGroup, setPrevGroup, initialStatePaging } from "@/lib/redux/slice";
import { PageDispatch, RootState } from "@/lib/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const pathnameCondition = (pathname:string) => {
  if(pathname === "/search") return "search";
  return "home";
};

const Pagination = ({ 
  size, 
  total,
  pathname
}: { 
  size: number; 
  total: number;
  pathname: string;
}) => {
  // const pathname = usePathname();
  const router = useRouter();
  // const currentPathname = pathnameCondition(pathname);
  // const [currentPathname, setCurrentPathname] = useState(pathnameCondition(pathname));

  const pageStore = useSelector<RootState>(
    (state) => state.page.current,
  ) as number;

  const groupStore = useSelector<RootState>(
    (state) => state.group.current,
  ) as number;

  const typeStore = useSelector<RootState>(
    (state) => state.type.current,
  ) as number;

  const pagingStore = useSelector<RootState>(
    (state) => state.paging,
  ) as Record<string, initialStatePaging>;


  const dispatch = useDispatch<PageDispatch>();

  useEffect(() => {

    // const pathnameCondition = (pathname === "/");
    // const getPage = sessionStorage.getItem("page");
    // const getGroup = sessionStorage.getItem("group");

    // dispatch(setCurrentType(pathname));

    // if(getPage){
    //   dispatch(setCurrentPage(Number(getPage)));
    // }

    // if(getGroup){
    //   dispatch(setCurrentGroup(Number(getGroup)));
    // }

    const getPaging = sessionStorage.getItem("paging");

    // dispatch(setCurrentType(pathname));

    // setCurrentPathname(pathnameCondition());

    // const currentPathnameResult = pathnameCondition();
    // setCurrentPathname(currentPathnameResult);

    if(pathname && getPaging){
      // dispatch(setCurrentPage(Number(getPage)));

      const getPagingData = JSON.parse(getPaging);
      dispatch(setPage(getPagingData[pathname].page));
      dispatch(setGroup(getPagingData[pathname].group));
    }

    // if(currentPathname && getPaging){
    //   // dispatch(setCurrentGroup(Number(getGroup)));


    //   dispatch(setGroup(Number(getGroup)));
    // }

  }, 
  // [currentPathname, dispatch, pathname, groupStore, pageStore, typeStore, pagingStore]
  [dispatch, pathname, pagingStore]
);
  
  const pageLength = Math.round(total / size);
  const pagerArr = Array.from({ length: pageLength }, (_, idx) => idx + 1);

  const slicedPaginationArr = useMemo(() => {
    // return pagerArr.slice(groupStore, groupStore + size);
    return pagerArr.slice(pagingStore[pathname].group, ((pagingStore[pathname].group) + size));
  },
  // [groupStore, currentPathname, size, pagerArr]
  [pagingStore, pathname, size, pagerArr]
);

  const handlePrevGroup = () => {
    // dispatch(setCurrentGroupPrev(size));
    // dispatch(setCurrentPage(groupStore));

    dispatch(setPrevGroup(size))
    dispatch(setPage(pagingStore[pathname].group))
  };

  const handleNextGroup = () => {
    // dispatch(setCurrentGroupNext(size));
    // dispatch(setCurrentPage(groupStore + size + 1));

    dispatch(setNextGroup(size));
    dispatch(setPage(
      (pagingStore[pathname].group) + size + 1
    ));
  };

  const Pager = React.memo(({ pager }: { pager: number }) => {
    return (<li className={pager === 
    // pageStore
    pagingStore[pathname].page 
    ? "font-bold" : "font-normal opacity-40"}>
        <button onClick={() => {
          // dispatch(setCurrentPage(pager))

          dispatch(setPage(pager))
        }}>{pager}</button>
      </li>)
  });
  Pager.displayName = "Pager";

  return (
    <div className="w-full flex justify-center items-center gap-x-[15px] mt-[30px]">
      {
        // !groupStore  
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
        // pagerArr.length > (groupStore + size)
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
