import { configureStore } from "@reduxjs/toolkit"
import { pageSliceReducer, groupSliceReducer, typeSliceReducer, pagingSliceReducer } from "./slice";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       page: pageSliceReducer,
//       group: groupSliceReducer,
//       type: typeSliceReducer
//     }
//   })
// };

export const makeStore = () => {
  return configureStore({
    reducer: {
      page: pageSliceReducer,
      group: groupSliceReducer,
      type: typeSliceReducer,
      paging: pagingSliceReducer
    }
  })
};

export type PageStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<PageStore["getState"]>;
export type PageDispatch = PageStore["dispatch"];