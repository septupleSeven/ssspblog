import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateCurrent<P> = {
    current: P
};

export type initialStatePaging = {
    page: number
    group: number
};

// function pathnameCondition () {
//     if(window) {
//         return window.location.pathname === "/";
//     }

//     return false;
// }

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
        }
    }
});

export const pageSlice = createSlice({
    name: "page",
    initialState: {
        current: 1
    } as initialStateCurrent<number>,
    reducers: {
        setCurrentPage: (page, action:PayloadAction<number>) => {
            page.current = action.payload
            const pageStr = page.current.toString();
            // if(pathnameCondition()) sessionStorage.setItem("page", pageStr);
            sessionStorage.setItem("page", pageStr);
        }
    }
});

export const groupSlice = createSlice({
    name: "group",
    initialState: {
        current: 0
    } as initialStateCurrent<number>,
    reducers: {
        setCurrentGroupNext: (group, action:PayloadAction<number>) => {
            group.current += action.payload;
            const groupStr = group.current.toString();
            // if(pathnameCondition()) sessionStorage.setItem("group", groupStr);
            sessionStorage.setItem("group", groupStr)
        },
        setCurrentGroupPrev: (group, action:PayloadAction<number>) => {
           if(group.current > 0) {
            group.current -= action.payload;
           }else{
            group.current = 0;
           }
           const groupStr = group.current.toString();
        //    if(pathnameCondition()) sessionStorage.setItem("group", groupStr);
           sessionStorage.setItem("group", groupStr)
        },
        setCurrentGroup: (group, action:PayloadAction<number>) => {
            group.current = action.payload;
            const groupStr = group.current.toString();
            sessionStorage.setItem("group", groupStr);
         }
    }
});

export const typeSlice = createSlice({
    name: "type",
    initialState: {
        current: ""
    } as initialStateCurrent<string>,
    reducers: {
        setCurrentType: (type, action:PayloadAction<string>) => {
            type.current = action.payload;
            sessionStorage.setItem("type", type.current);
        }
    }
});

export const { setCurrentPage } = pageSlice.actions;
export const pageSliceReducer = pageSlice.reducer;

export const { setCurrentGroupNext, setCurrentGroupPrev, setCurrentGroup } = groupSlice.actions;
export const groupSliceReducer = groupSlice.reducer;

export const { setCurrentType } = typeSlice.actions;
export const typeSliceReducer = typeSlice.reducer;

export const { setPage, setGroup, setPrevGroup, setNextGroup } = pagingSlice.actions;
export const pagingSliceReducer = pagingSlice.reducer;
