import { createSlice } from "@reduxjs/toolkit";

//--------------------------------------------- state list song ----------------------------------------
const initialStateListSong = {
    listSong: []
};

//reducers
const listMusicSlice = createSlice({
    name: "listSong",
    initialState: initialStateListSong,
    reducers: {
        setListSong: (state, action) => {
            state.listSong = [...action.payload];
        },

    },
});





//actions
const { setListSong } = listMusicSlice.actions;

export { setListSong };
export const sliceListSongReducer = listMusicSlice.reducer;

