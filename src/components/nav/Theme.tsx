"use client";

import {
  MoonIcon,
  ComputerDesktopIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Theme = () => {
  const { theme, themes, setTheme } = useTheme();

  const [isLoaded, setloaded] = useState(false);

  const [themeHandler, setThemeHandler] = useState<boolean>(false);
  const [filteredThemes, setFilteredThemes] = useState<string[]>([...themes]);

  const ThemeIcon = ({
    theme = "system",
    color = "border-primary-white",
  }: {
    theme?: string;
    color?: string;
  }) => {
    switch (theme) {
      case "light":
        return <SunIcon className={`size-5 ${color}`} />;
      case "dark":
        return <MoonIcon className={`size-5 ${color}`} />;
      case "system":
        return <ComputerDesktopIcon className={`size-5 ${color}`} />;
      default:
        return <ComputerDesktopIcon className={`size-5 ${color}`} />;
    }
  };

  const handleTheme = ({ theme }: { theme?: string }) => {
    const copiedThemes = [...themes];
    const filteredThemes = copiedThemes.filter(
      (item: string) => item !== theme,
    );

    setFilteredThemes([...filteredThemes]);

    if (!themeHandler) {
      setThemeHandler(true);
    } else {
      setThemeHandler(false);
    }
  };

  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => handleTheme({ theme: theme })}
        className="relative z-10 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-full border border-primary-black bg-white dark:border-primary-white dark:bg-primary-black"
      >
        {isLoaded && <ThemeIcon theme={theme} />}
      </button>

      <ul
        className={`absolute left-[50%] top-[50%] flex h-[30px] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-y-[10px]`}
      >
        <AnimatePresence>
          {isLoaded && themeHandler &&
            filteredThemes.map((thisTheme, idx) => {
              return (
                <motion.li
                  key={idx}
                  initial={{ top: 0 }}
                  animate={{
                    top: `calc(${100 * (idx + 1)}% + ${10 * (idx + 1)}px)`,
                  }}
                  exit={{ top: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute flex min-h-[30px] min-w-[30px] items-center justify-center rounded-full bg-primary`}
                >
                  <button
                    onClick={() => {
                      setThemeHandler(false);
                      setTheme(thisTheme);
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <ThemeIcon theme={thisTheme} color="text-white" />
                  </button>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default Theme;
