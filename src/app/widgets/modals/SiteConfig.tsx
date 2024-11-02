"use client";
import { toggleModal } from "@/app/store/redux/slice";
import { SiteConfigDispatch } from "@/app/store/redux/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { siteConfigVal } from "../../../../shared/config/config";
import SelectList from "./SelectList";
import { AnimatePresence, motion } from "framer-motion";

const SiteConfig = () => {
  const dispatch = useDispatch<SiteConfigDispatch>();

  const modalDisplay = {
    show: { opacity: 1, display: "flex" },
    hide: { opacity: 0, display: "none" },
  };

  return (
      <motion.div
        initial={"hide"}
        animate={"show"}
        exit={"hide"}
        variants={modalDisplay}
        className="fixed left-0 top-0 z-[9999] flex h-[100%] w-[100%] items-center justify-center bg-black/60 semi-desktop:px-[20px]"
      >
        <div className="relative z-[2] w-[100%] max-w-[500px] rounded-md bg-primary px-[30px] py-[40px] text-white dark:bg-primary-black dark:text-primary-white semi-mobile:px-[20px] semi-mobile:py-[30px]">
          <h1 className="mb-[40px] text-[1.75rem] font-bold semi-mobile:mb-[30px] semi-mobile:text-[1.375rem]">
            사이트 설정
          </h1>
          <ul className="flex flex-col gap-y-[25px] semi-mobile:gap-y-[20px]">
            {siteConfigVal.map((el) => {
              return (
                <SelectList
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  values={el.values}
                />
              );
            })}
          </ul>
          <button
            className="absolute right-[30px] top-[40px] semi-mobile:right-[20px] semi-mobile:top-[30px]"
            onClick={() => {
              dispatch(toggleModal(false));
            }}
          >
            <XMarkIcon className="size-[30px]" />
          </button>
        </div>
        <div
          onClick={() => {
            dispatch(toggleModal(false));
          }}
          className="absolute left-0 top-0 h-[100%] w-[100%] cursor-pointer bg-black/50"
        ></div>
      </motion.div>
  );
};

export default SiteConfig;
