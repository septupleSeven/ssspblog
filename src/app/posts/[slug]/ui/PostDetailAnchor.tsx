"use client";
import React, { useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import { BookmarkIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const PostDetailAnchor = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const blockIds = Object.keys(recordMap.block);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const headerBlocks = blockIds
    .filter((id) => {
      const type = recordMap.block[id]?.value?.type as string;
      if (type === "header") return id;
    })
    .map((filterdId) => ({
      id: recordMap.block[filterdId].value.id.replace(/-/g, ""),
      value: recordMap.block[filterdId].value.properties.title[0],
    }));

  if (headerBlocks.length) {
    return (
      <div className="relative flex items-end gap-x-[20px]">
        <motion.ul
          initial={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            display: "none",
          }}
          animate={{
            clipPath: `${
              isOpen
                ? "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
            }`,
            display: `${isOpen ? "flex" : "none"}`,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="absolute min-w-[150px] max-w-[250px] translate-x-[calc(-100%-20px)] flex-col gap-y-[10px] rounded-[5px] bg-primary p-[20px] pl-[15px] text-white semi-mobile:max-w-[150px] semi-mobile:gap-y-[5px] semi-mobile:pl-[10px] semi-mobile:pr-[15px]"
        >
          {headerBlocks.map((blockId) => (
            <li key={blockId.id} className="group flex gap-x-[10px] text-sm">
              <LinkIcon className="size-4 min-w-[16px] max-w-[16px] translate-y-[2px] opacity-0 duration-[0.3s] group-hover:opacity-100" />
              <a
                href={`#${blockId.id}`}
                className="opacity-50 duration-[0.3s] group-hover:opacity-100"
              >
                {blockId.value}
              </a>
            </li>
          ))}
        </motion.ul>
        <button
          onClick={() => handleOpen()}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white shadow-reg semi-mobile:h-[40px] semi-mobile:w-[40px] semi-mobile:p-[10px]"
        >
          {isOpen ? (
            <XMarkIcon className="size-6" />
          ) : (
            <BookmarkIcon className="size-6" />
          )}
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default PostDetailAnchor;
