"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Searchbar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [paramState, setParamState] = useState("");
  const [isFocus, setFocus] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const params = new URLSearchParams(searchParams);

  const handleSearchQuery = (term: string) => {
    if (term.length) {
      params.set("keyword", term);
    } else {
      params.delete("keyword");
    }

    if (searchParams.has("category")) {
      params.delete("category");
    }

    setParamState(params.toString());
  };

  const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  const handleSearch = () => {
    if (!paramState) {
      alert("검색어를 입력해주세요.");
      return false;
    }

    return push(`${pathname}search?${paramState.toString()}`);
  };

  const [isLoaded, setloaded] = useState(false);
  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <div className="mx-auto my-0 mb-[40px] w-full max-w-[1024px]">
      <div
        className={`flex items-center gap-x-[10px] rounded-md bg-primary-white px-[15px] py-[10px] shadow-reg duration-[0.3s] dark:bg-primary-black ${isFocus ? "border border-primary" : ""}`}
      >
        <input
          className="focus: h-full w-full bg-transparent text-[1.125rem] outline-none placeholder:text-primary-black-50 dark:placeholder:text-primary-white-50 semi-mobile:text-[1rem]"
          type="text"
          onChange={(e) => handleSearchQuery(e.target.value)}
          onKeyUp={(e) => handleEnterEvent(e)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="제목으로 검색하기"
        />
        <button
          className="flex min-h-[35px] min-w-[35px] items-center justify-center rounded-full bg-primary"
          type="button"
          onClick={() => handleSearch()}
          ref={buttonRef}
        >
          {isLoaded && (
            <MagnifyingGlassIcon className="size-[20px] text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
