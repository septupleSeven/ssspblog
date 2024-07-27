"use client";

import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import React, { forwardRef } from "react";

const Navbar = () => {

  interface LogoButtonProps {
    onClick: () => void
    href?: string
  }
  
  const LogoButton = forwardRef<HTMLAnchorElement, LogoButtonProps>(({
    onClick,
    href
  }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
          {/* <Image src={} width={} alt="logo" /> */}
          로고
      </a>
    )
  });
  LogoButton.displayName = "LogoButton";

  const resetPage = () => {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("group")
  }


  return (
    <header className="fixed left-0 top-0 w-full bg-white dark:bg-primary-black">
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
  );
};

export default Navbar;
