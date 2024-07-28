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

  const handleSearchQuery = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term.length) {
      params.set("keyword", term);
    } else {
      params.delete("keyword");
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
    <div className="mx-auto my-0 w-full max-w-[1320px]">
      <div
        className={`flex items-center gap-x-[10px] rounded-md bg-primary-black px-[15px] py-[10px] ${isFocus ? "border border-primary-white" : ""}`}
      >
        <input
          className="focus: h-full w-full bg-transparent text-[18px] outline-none"
          type="text"
          onChange={(e) => handleSearchQuery(e.target.value)}
          onKeyUp={(e) => handleEnterEvent(e)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="검색어를 입력해주세요"
        />
        <button
          className="flex min-h-[35px] min-w-[35px] items-center justify-center rounded-full bg-primary-white"
          type="button"
          onClick={() => handleSearch()}
          ref={buttonRef}
        >
          {isLoaded && (
            <MagnifyingGlassIcon className="size-5 text-primary-black" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
