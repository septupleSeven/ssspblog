"use client"
import React from 'react'

interface EmptyProps {
  title?: string;
}

const Empty = ({
  title = "게시물이 없습니다"
}) => {
  return (
    <div className="mx-auto my-0 w-full max-w-[1320px] semi-desktop:px-[20px]">
      <div className="flex flex-col items-center justify-center">
        {/* <Image /> */}
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Empty