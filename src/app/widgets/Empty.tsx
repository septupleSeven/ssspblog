"use client";
import React from "react";

const Empty = ({ title = "게시물이 없습니다" }) => {
  return (
    <div className="mx-auto my-0 flex min-h-[calc(100vh-125px)] w-full max-w-[1320px] items-center justify-center semi-mobile:min-h-[calc(100vh-115px)]">
      <div className="flex h-full w-full flex-col gap-y-[40px] items-center justify-center">
        <p className="text-9xl grayscale opacity-30">🤔</p>
        <p className="text-xl text-center font-medium">{title}</p>
      </div>
    </div>
  );
};

export default Empty;
