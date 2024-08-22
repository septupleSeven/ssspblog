"use client";

import Link from "next/link";
import Theme from "./Theme";
import React from "react";

const Navbar = () => {
  interface LogoButtonProps {
    onClick: () => void;
    href?: string;
  }

  const LogoButton = React.forwardRef<HTMLAnchorElement, LogoButtonProps>(
    ({ onClick, href }, ref) => {
      return (
        <a href={href} onClick={onClick} ref={ref} className="font-logo font-extrabold text-2xl semi-mobile:text-xl">
          {/* <Image src={} width={} alt="logo" /> */}
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
          group: 0
      },
      search: {
          page: 1,
          group: 0
      },
      category: {
        page: 1,
        group: 0
      }
    };

    sessionStorage.setItem("paging", JSON.stringify(initialState));
  };

  return (
    <div>
      <header className="fixed left-0 top-0 z-[5] w-full shadow-under bg-white dark:bg-primary-black">
        <div className="h-[65px] w-full px-5 semi-mobile:h-[55px]">
          <nav className="flex h-full w-full items-center">
            <div className="flex w-full items-center justify-between">
              <Link href="/" passHref legacyBehavior>
                <LogoButton onClick={resetPage} />
              </Link>
              <Theme />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
