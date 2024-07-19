"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Searchbar = () => {
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
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  const [isLoaded, setloaded] = useState(false);
  useEffect(() => {
    setloaded(true);
  }, []);

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
        {isLoaded && <MagnifyingGlassIcon className="size-6" />}
      </button>
    </div>
  );
};

export default Searchbar;
