import {
  initialStatePaging,
  initialStateSiteConfig,
  PagingSetting,
  payloadObj,
} from "@/app/types/slice-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { siteConfigVal } from "../../../../shared/config/config";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from "../../../../tailwind.config";

function pathnameCondition(pathname: string) {
  if (pathname === "/search") return "search";
  return "home";
}

export function setInitSiteCofig(localConfigKey:string, valueKey?: string) {
  if (typeof window !== "undefined" && typeof localStorage[localConfigKey] !== "undefined") {
    const parsedLocalConfig = JSON.parse(localStorage[localConfigKey]);

    if(valueKey){
      return parsedLocalConfig[valueKey];
    }else{
      return parsedLocalConfig;
    }

  }
  return false;
}

export const pagingSlice = createSlice({
  name: "paging",
  initialState: {
    home: {
      page: 1,
      group: 0,
    },
    search: {
      page: 1,
      group: 0,
    },
    category: {
      page: 1,
      group: 0,
    },
  } as Record<string, initialStatePaging>,
  reducers: {
    setPage: (paging, action: PayloadAction<payloadObj>) => {
      const getPageProp = pathnameCondition(window.location.pathname);
      const { isCategory, value } = action.payload;

      const getKey = isCategory ? "category" : getPageProp;

      paging[getKey].page = value;

      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setGroup: (paging, action: PayloadAction<payloadObj>) => {
      const getPageProp = pathnameCondition(window.location.pathname);
      const { isCategory, value } = action.payload;

      const getKey = isCategory ? "category" : getPageProp;

      paging[getKey].group = value;

      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setPrevGroup: (paging, action: PayloadAction<payloadObj>) => {
      const getPageProp = pathnameCondition(window.location.pathname);
      const { isCategory, value } = action.payload;

      const getKey = isCategory ? "category" : getPageProp;
      const getCurrentVal = paging[getKey].group;

      paging[getKey].group = Math.max(getCurrentVal - value, 0);

      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setNextGroup: (paging, action: PayloadAction<payloadObj>) => {
      const getPageProp = pathnameCondition(window.location.pathname);
      const { isCategory, value } = action.payload;

      const getKey = isCategory ? "category" : getPageProp;

      paging[getKey].group += value;

      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setSearchPage: (paging, action: PayloadAction<number>) => {
      paging.search.page = action.payload;
      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setSearchGroup: (paging, action: PayloadAction<number>) => {
      paging.search.group = action.payload;
      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setCatePage: (paging, action: PayloadAction<number>) => {
      paging.category.page = action.payload;
      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
    setCateGroup: (paging, action: PayloadAction<number>) => {
      paging.category.group = action.payload;
      sessionStorage.setItem("paging", JSON.stringify(paging));
    },
  },
});

export const getPagingActionPayload: (setting: PagingSetting) => payloadObj = (
  setting,
) => {
  const { option, isCate } = setting;
  let value = 0;

  switch (option) {
    case "initalize": {
      const { state, pathname, keyName } = setting;
      value = isCate ? state["category"][keyName] : state[pathname][keyName];
      break;
    }
    case "vanilla": {
      const { val } = setting;
      value = val;
      break;
    }
    case "nextGroup": {
      const { state, pathname, keyName, size, val } = setting;
      value = isCate
        ? state["category"][keyName] + size + val
        : state[pathname][keyName] + size + val;
      break;
    }
  }

  return {
    isCategory: setting.isCate,
    value,
  };
};

export const siteConfigSlice = createSlice({
  name: "siteconfig",
  initialState: {
    modalOpen: false,
    config: {
      listStyle: "gallery",
      fontSize: "16px",
      themeColor: "primary",
      activeBookmarkBtn: "T",
      activeScrollTopBtn: "T",
    },
  } as initialStateSiteConfig,
  reducers: {
    toggleModal(siteConfig, action: PayloadAction<boolean>) {
      siteConfig.modalOpen = action.payload;
    },
    setStorageValue: (siteConfig) => {
      const initialConfig = setInitSiteCofig("siteConfig");

      if(initialConfig){
        siteConfig.config = { ...siteConfig.config, ...initialConfig };
      }else{
        localStorage.setItem("siteConfig", JSON.stringify(siteConfig))
      }
    },
    setConfigValue(
      siteConfig,
      action: PayloadAction<{
        configId: string;
        value: string;
      }>,
    ) {
      const { configId, value } = action.payload;
      const copiedConfig = { ...siteConfig.config, ...{[configId]: value}};
      siteConfig.config = { ...siteConfig.config, ...copiedConfig };
      localStorage.setItem( "siteConfig", JSON.stringify(copiedConfig));
    },
    changeStyle(siteConfig, action:PayloadAction<{
      configId: string;
    }>){
      const { config } = siteConfig;
      const { configId } = action.payload; 
      
      if(typeof window !== "undefined") {
        const getLocalConfig = setInitSiteCofig("siteConfig");

        switch (configId) {
          case "fontSize": {
            if(getLocalConfig) {
              document.documentElement.style.fontSize = getLocalConfig[configId];
            }else{
              document.documentElement.style.fontSize = config[configId];
            }
            break;
          }
        }

      }
    
    }
  },
});

export const {
  setPage,
  setGroup,
  setPrevGroup,
  setNextGroup,
  setSearchPage,
  setSearchGroup,
  setCatePage,
  setCateGroup,
} = pagingSlice.actions;
export const pagingSliceReducer = pagingSlice.reducer;
export const { toggleModal, setConfigValue, setStorageValue, changeStyle } =
  siteConfigSlice.actions;
export const siteConfigSliceReducer = siteConfigSlice.reducer;
