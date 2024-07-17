"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

const Test = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [paramState, setParamState] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      setParamState(params.toString());
    } else {
      params.delete("query");
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      buttonRef.current?.click();
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        onKeyUp={(e) => handleEnter(e)}
      />
      <button
        type="button"
        onClick={() => push(`${pathname}search?${paramState.toString()}`)}
        ref={buttonRef}
      >
        검색
      </button>
    </div>
  );
};

export default Test;
