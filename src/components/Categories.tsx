"use client";
import { setCateGroup, setCatePage } from "@/lib/redux/slice";
import { PageDispatch } from "@/lib/redux/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const Categories = ({
  validCate,
  total,
}: {
  validCate: string[];
  total: number;
}) => {
  const searchParams = useSearchParams();
  const getCate = searchParams.get("category");

  const dispatch = useDispatch<PageDispatch>();

  interface CateButtonProps {
    cateName: string;
    onClick: () => void;
    active: boolean;
    href?: string;
  }

  const CateButton = React.forwardRef<HTMLAnchorElement, CateButtonProps>(
    ({ cateName, onClick, active, href }, ref) => {
      return (
        <a 
        href={href} 
        onClick={onClick} 
        ref={ref} 
        className={`w-full h-full text-[0.9375rem] flex justify-center items-center py-[10px] duration-[0.3s]
        ${active ? "bg-primary-white dark:bg-primary-black font-medium shadow-reg" : "opacity-40 hover:text-primary hover:opacity-100"}
        semi-mobile:text-sm`}>
          {cateName}
          {active && <span className="text-primary text-xs">{"\u00A0"}{"\u0028"}{total}{"\u0029"}</span>}
        </a>
      );
    },
  );
  CateButton.displayName = "CateButton";

  const resetCatePage = () => {
    dispatch(setCatePage(1));
    dispatch(setCateGroup(0));
  };

  return (
    <ul className="idx_cate__container w-full overflow-hidden grid grid-cols-8 mb-[30px] border-b-2 border-primary-black dark:border-primary-white semi-tab:grid-cols-4 semi-mobile:flex">
      <li className="w-full h-full relative" key={"all"}>
        <Link href={`/`} passHref legacyBehavior>
          <CateButton cateName={"전체"} onClick={resetCatePage} active={
            !getCate || !validCate.includes(getCate) ? true : false
          } />
        </Link>
      </li>
      {validCate.map((cate, idx) => (
        <li key={idx} className="w-full flex relative">
          <Link href={`/?category=${cate}`} passHref legacyBehavior>
            <CateButton cateName={`# ${cate}`} onClick={resetCatePage} active={
              getCate === cate ? true : false
            } />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
