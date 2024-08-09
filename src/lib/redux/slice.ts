import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateCurrent<P> = {
    current: P
};

export type initialStatePaging = {
    page: number
    group: number
};

function pathnameCondition (pathname:string) {
    if(pathname === "/search") return "search";
    return "home";
}

export const pagingSlice = createSlice({
    name: "paging",
    initialState: {
        home: {
            page: 1,
            group: 0
        },
        search: {
            page: 1,
            group: 0
        }
    } as Record<string, initialStatePaging>,
    reducers: {
        setPage: (paging, action:PayloadAction<number>) => {
            const getPageProp = pathnameCondition(window.location.pathname); 
            paging[getPageProp].page = action.payload;
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
        setGroup: (paging, action:PayloadAction<number>) => {
            const getPageProp = pathnameCondition(window.location.pathname); 
            paging[getPageProp].group = action.payload;
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
        setPrevGroup: (paging, action:PayloadAction<number>) => {
            const getPageProp = pathnameCondition(window.location.pathname); 
            if(paging[getPageProp].group > 0) {
                paging[getPageProp].group -= action.payload;
            }else{
                paging[getPageProp].group = 0;
            }
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
        setNextGroup: (paging, action:PayloadAction<number>) => {
            const getPageProp = pathnameCondition(window.location.pathname);
            paging[getPageProp].group += action.payload;
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
        setSearchPage: (paging, action:PayloadAction<number>) => {
            paging.search.page = action.payload;
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
        setSearchGroup: (paging, action:PayloadAction<number>) => {
            paging.search.group = action.payload;
            sessionStorage.setItem("paging", JSON.stringify(paging));
        },
    }
});

export const { setPage, setGroup, setPrevGroup, setNextGroup, setSearchPage, setSearchGroup } = pagingSlice.actions;
export const pagingSliceReducer = pagingSlice.reducer;
