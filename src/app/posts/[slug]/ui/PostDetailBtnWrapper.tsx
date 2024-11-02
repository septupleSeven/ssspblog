"use client";
import React, { useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import PostDetailAnchor from "./PostDetailAnchor";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import PostDetailScrollToTop from "./PostDetailScrollToTop";
import { useSelector } from "react-redux";
import { RootStateSiteConfig } from "@/app/store/redux/store";
import { initialStateSiteConfig } from "@/app/types/slice-types";

const PostDetailBtnWrapper = ({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) => {
    const siteConfigStore = useSelector<RootStateSiteConfig>(
        state => state.siteConfig
    ) as initialStateSiteConfig;
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const btnDisplay = {
    show: { opacity: 1, display: "flex" },
    hide: { opacity: 0, display: "none" },
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 0.9) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={"hide"}
        animate={isScrolled ? "show" : "hide"}
        variants={btnDisplay}
        className="fixed bottom-[20px] right-[20px] z-[5] flex h-auto w-auto flex-col gap-y-[10px]"
      >
        {siteConfigStore.config.activeBookmarkBtn === "T" ? <PostDetailAnchor recordMap={recordMap} /> : null}
        {siteConfigStore.config.activeScrollTopBtn === "T" ? <PostDetailScrollToTop /> : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default PostDetailBtnWrapper;
