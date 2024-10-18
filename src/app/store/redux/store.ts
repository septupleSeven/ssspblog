import { configureStore } from "@reduxjs/toolkit"
import { pagingSliceReducer } from "./slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      paging: pagingSliceReducer
    }
  })
};

export type PageStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<PageStore["getState"]>;
export type PageDispatch = PageStore["dispatch"];