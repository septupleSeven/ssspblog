"use client";

import Link from "next/link";
import Theme from "./Theme";
import React, { useEffect, useRef, useState } from "react";
import StyleConfig from "./StyleConfig";
import SiteConfig from "../modals/SiteConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootStateSiteConfig, SiteConfigDispatch } from "@/app/store/redux/store";
import { initialStateSiteConfig } from "@/app/types/slice-types";
import { changeStyle, setStorageValue, toggleModal } from "@/app/store/redux/slice";

const Navbar = () => {
  const siteConfigStore = useSelector<RootStateSiteConfig>((state) => state.siteConfig) as initialStateSiteConfig;
  const dispatch = useDispatch<SiteConfigDispatch>();
  const firstLoadRef = useRef(true);

  interface LogoButtonProps {
    onClick: () => void;
    href?: string;
  }

  const LogoButton = React.forwardRef<HTMLAnchorElement, LogoButtonProps>(
    ({ onClick, href }, ref) => {
      return (
        <a
          href={href}
          onClick={onClick}
          ref={ref}
          className="font-logo text-2xl font-extrabold semi-mobile:text-xl"
        >
          SS&apos;sPBlog
        </a>
      );
    },
  );
  LogoButton.displayName = "LogoButton";

  const resetPage = () => {
    const initialState = {
      home: {
        page: 1,
        group: 0,
      },
      search: {
        page: 1,
        group: 0,
      },
      category: {
        page: 1,
        group: 0,
      },
    };

    sessionStorage.setItem("paging", JSON.stringify(initialState));
  };

  useEffect(() => {
    if(typeof window !== "undefined"){

      if(firstLoadRef.current){
        dispatch(setStorageValue());
        dispatch(changeStyle({ configId: "fontSize"}));

        firstLoadRef.current = false;
      }

    }
  }, [dispatch]);

  return (
    <>
      <div>
        <header className={`fixed left-0 top-0 z-[5] w-full bg-white shadow-under dark:bg-primary-black`}>
          <div className="h-[65px] w-full px-5 semi-mobile:h-[55px]">
            <nav className="flex h-full w-full items-center">
              <div className="flex w-full items-center justify-between">
                <Link href="/" passHref legacyBehavior>
                  <LogoButton onClick={resetPage} />
                </Link>
                <div className="flex items-center gap-x-[15px]">
                  <Theme />
                  <StyleConfig onClick={() => {
                    dispatch(toggleModal(true))
                  }} />
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
      {siteConfigStore.modalOpen ? <SiteConfig /> : null}
    </>
  );
};

export default Navbar;
