"use client";

import Link from "next/link";
import Theme from "./Theme";
import Image from "next/image";
import React from "react";

const Navbar = () => {

  interface LogoButtonProps {
    onClick: () => void
    href?: string
  }
  
  const LogoButton = React.forwardRef<HTMLAnchorElement, LogoButtonProps>(({
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
    sessionStorage.setItem("page", "1");
    sessionStorage.setItem("group", "0");
  }


  return (
    <header className="fixed z-50 left-0 top-0 w-full bg-white dark:bg-primary-black">
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
