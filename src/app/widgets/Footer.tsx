import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-y-[15px] w-full p-[20px] bg-white dark:bg-primary-black">
      <p className="text-sm text-center">Copyright © 2024 All Right septupleSeven</p>
      <Link 
      href="https://github.com/septupleSeven" 
      target="_blank" 
      prefetch={false}
      className="block size-[24px] bg-cover bg-github-mark-light bg-no-repeat dark:bg-github-mark-dark"
      >
      </Link>
    </footer>
  );
};

export default Footer;
