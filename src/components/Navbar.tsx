"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const Navbar = () => {

  const { themes, setTheme } = useTheme();
  
  return (
    <header className="fixed left-0 top-0 w-full bg-white dark:bg-primary-black">
      <div className="h-[65px] w-full px-5">
        <nav className="flex h-full w-full items-center">
          <div className="flex w-full items-center justify-between">
            <Link href="/">로고하</Link>

            <div className="flex items-center gap-x-5">
              <ul className="flex items-center gap-x-5">
                <li>
                  <Link href="/">d</Link>
                </li>
                <li>
                  <Link href="/">d</Link>
                </li>
                <li>
                  <Link href="/">d</Link>
                </li>
              </ul>

              <div className="flex items-center gap-x-5">
                <button onClick={
                  () => setTheme("dark")
                }>다크</button>
                <button onClick={
                  () => setTheme("system")
                }>시스템</button>
                <button onClick={
                  () => setTheme("light")
                }>라이트</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
