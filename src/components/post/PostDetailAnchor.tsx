"use client";
import React, { useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import { BookmarkIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const PostDetailAnchor = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const blockIds = Object.keys(recordMap.block);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen)
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
      <AnimatePresence>
        <div className="z-50 fixed bottom-[20px] right-[20px] flex flex-col items-end gap-y-[20px] overflow-hidden">
          <motion.ul
            initial={{
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            }}
            animate={{
              clipPath: `${
                isOpen ? "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
              }`,
            }}
            transition={{ 
              ease: "easeInOut",
              duration: 0.3 
            }}
            className="max-w-[250px] w-full p-[20px] pl-[8px] rounded-[5px] flex flex-col gap-y-[10px] dark:bg-primary-black"
          >
            {headerBlocks.map((blockId) => (
              <li key={blockId.id} className="group text-sm flex gap-x-[10px]">
                <LinkIcon className="size-4 opacity-0 min-w-[16px] max-w-[16px] translate-y-[2px] group-hover:opacity-100" />
                <a href={`#${blockId.id}`} className="opacity-50 group-hover:opacity-100">{blockId.value}</a>
              </li>
            ))}
          </motion.ul>
          <button onClick={() => handleOpen()} className="flex justify-center items-center w-[50px] h-[50px] rounded-full dark:bg-primary-black">
            {isOpen ? <XMarkIcon className="size-6" /> : <BookmarkIcon className="size-6" />}
          </button>
        </div>
      </AnimatePresence>
    );
  } else {
    return null;
  }
};

export default PostDetailAnchor;
