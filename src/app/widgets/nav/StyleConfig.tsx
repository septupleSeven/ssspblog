import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import React from "react";

const StyleConfig = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="relative z-10 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-full border border-primary-black bg-white dark:border-primary-white dark:bg-primary-black"
    >
      <Cog8ToothIcon className="size-[20px]" />
    </button>
  );
};

export default StyleConfig;
