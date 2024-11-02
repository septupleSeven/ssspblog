import { configureStore } from "@reduxjs/toolkit"
import { pagingSliceReducer, siteConfigSliceReducer } from "./slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      paging: pagingSliceReducer,
      siteConfig: siteConfigSliceReducer
    }
  })
};

export type PageStore = ReturnType<typeof makeStore>;
export type RootStatePaging = ReturnType<PageStore["getState"]>;
export type PageDispatch = PageStore["dispatch"];
export type SiteConfigStore = ReturnType<typeof makeStore>;
export type RootStateSiteConfig = ReturnType<SiteConfigStore["getState"]>;
export type SiteConfigDispatch = SiteConfigStore["dispatch"];