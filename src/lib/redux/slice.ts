import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    current: number
};

export const pageSlice = createSlice({
    name: "page",
    initialState: {
        current: 1
    } as initialStateType,
    reducers: {
        setCurrentPage: (page, action:PayloadAction<number>) => {
            page.current = action.payload
            const pageStr = page.current.toString();
            sessionStorage.setItem("page", pageStr);
        }
    }
});

export const groupSlice = createSlice({
    name: "group",
    initialState: {
        current: 0
    } as initialStateType,
    reducers: {
        setCurrentGroupNext: (group, action:PayloadAction<number>) => {
            group.current += action.payload;
            const groupStr = group.current.toString();
            sessionStorage.setItem("group", groupStr);
        },
        setCurrentGroupPrev: (group, action:PayloadAction<number>) => {
           if(group.current > 0) {
            group.current -= action.payload
           }else{
            group.current = 0
           }
           const groupStr = group.current.toString();
           sessionStorage.setItem("group", groupStr);
        }
    }
});

export const { setCurrentPage } = pageSlice.actions;
export const pageSliceReducer = pageSlice.reducer;

export const { setCurrentGroupNext, setCurrentGroupPrev } = groupSlice.actions;
export const groupSliceReducer = groupSlice.reducer;