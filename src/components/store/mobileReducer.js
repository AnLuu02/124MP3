import { createSlice } from "@reduxjs/toolkit";


const initialStateMobile = {
    isShowSidebar: false,
    isShowSearchBox: false,
};


const mobileSlice = createSlice({
    name: "mobile",
    initialState: initialStateMobile,
    reducers: {
        setStateSidebar(state, action) {
            state.isShowSidebar = action.payload
        },
        setStateSearchBox(state, action) {
            state.isShowSearchBox = action.payload
        }
    }
})


export const { setStateSidebar, setStateSearchBox } = mobileSlice.actions
export const sliceMobileReducer = mobileSlice.reducer