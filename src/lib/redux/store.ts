import { configureStore } from "@reduxjs/toolkit"
import { pageSliceReducer, groupSliceReducer } from "./slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      page: pageSliceReducer,
      group: groupSliceReducer
    }
  })
};

export type PageStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<PageStore["getState"]>;
export type PageDispatch = PageStore["dispatch"];