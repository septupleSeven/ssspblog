import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-y-[15px] bg-white p-[20px] dark:bg-primary-black">
      <p className="text-center text-sm">
        Copyright © 2024 All Right septupleSeven
      </p>
      <Link
        href="https://github.com/septupleSeven"
        target="_blank"
        prefetch={false}
        className="block size-[24px] bg-github-mark-light bg-cover bg-no-repeat dark:bg-github-mark-dark"
        title="깃허브로 이동"
      ></Link>
    </footer>
  );
};

export default Footer;
