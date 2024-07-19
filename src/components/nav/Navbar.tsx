"use client";

import Link from "next/link";
import Theme from "./Theme";

const Navbar = () => {

  return (
    <header className="fixed left-0 top-0 w-full bg-white dark:bg-primary-black">
      <div className="h-[65px] w-full px-5">
        <nav className="flex h-full w-full items-center">
          <div className="flex w-full items-center justify-between">
            <Link href="/">로고하</Link>
            <Theme />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
