"use client";

import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  interface LogoButtonProps {
    onClick: () => void;
    href?: string;
  }

  const LogoButton = React.forwardRef<HTMLAnchorElement, LogoButtonProps>(
    ({ onClick, href }, ref) => {
      return (
        <a href={href} onClick={onClick} ref={ref}>
          {/* <Image src={} width={} alt="logo" /> */}
          로고
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
      }
    };
    // sessionStorage.removeItem("page");
    // sessionStorage.removeItem("group");
    sessionStorage.setItem("paging", JSON.stringify(initialState));
  };

  return (
    <div>
      <header className="fixed left-0 top-0 z-50 w-full bg-white dark:bg-primary-black">
        <div className="h-[65px] w-full px-5">
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
