import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialStatePaging = {
  page: number;
  group: number;
};

type payloadObj = {
  isCategory: boolean;
  value: number;
};

type pagingOptionType = "initalize" | "vanilla" | "nextGroup";

interface BasePagingSetting {
  option: pagingOptionType;
  isCate: boolean;
}

type PagingSetting =
  | (BasePagingSetting & {
      option: "initalize";
      state: Record<string, initialStatePaging>;
      pathname: string;
      keyName: keyof initialStatePaging;
    })
  | (BasePagingSetting & {
      option: "vanilla";
      val: number;
    })
  | (BasePagingSetting & {
      option: "nextGroup";
      state: Record<string, initialStatePaging>;
      pathname: string;
      keyName: keyof initialStatePaging;
      size: number;
      val: number;
    });

function pathnameCondition(pathname: string) {
  if (pathname === "/search") return "search";
  return "home";
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
      value = isCate ? state["category"][keyName] + size + val : state[pathname][keyName] + size + val;
      break;
    }
  }

  return {
    isCategory: setting.isCate,
    value,
  };
};

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
