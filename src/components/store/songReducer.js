import { createSlice } from "@reduxjs/toolkit";


const initialStateSong = {
    isPlay: false,
    isRepeat: false,
    isRandom: false,
    song: {},
    indexSong: -1,
    currentTimeSong: {},
    tuanhac: 0,
    volume: 0.5,
};

//slice
const musicSlice = createSlice({
    name: "song",
    initialState: initialStateSong,
    reducers: {
        setSong: (state, action) => {
            state.song = { ...action.payload.song };
            state.indexSong = action.payload.indexSong;
        },
        playSong: (state, action) => {
            state.isPlay = true;
            state.song = { ...action.payload.song };
            state.indexSong = action.payload.indexSong;
        },
        pauseSong: (state) => {
            state.isPlay = false;
        },
        endedSong: (state) => {
            state.isPlay = false;
        },
        timeUpdateSong: (state, action) => {
            state.currentTimeSong = { ...action.payload };
        },
        nextSong: (state, action) => {
            state.song = { ...action.payload.song };
            state.indexSong = action.payload.indexSong;
            state.isPlay = true;

        },
        prevSong: (state, action) => {
            state.song = { ...action.payload.song };
            state.indexSong = action.payload.indexSong;
            state.isPlay = true;

        },
        repeatSong: (state, action) => {
            state.isRepeat = action.payload;
            if (state.isRepeat) {
                state.isRandom = false;
            }
        },
        randomSong: (state, action) => {
            state.isRandom = action.payload;
            if (state.isRandom) {
                state.isRepeat = false;
            }
        },
        changeVolume: (state, action) => {
            state.volume = action.payload;
        },
        changeTimeSong: (state, action) => {
            state.tuanhac = action.payload;
        }

    },
});

//selectors
const timeProgress = state => {
    if (state.song.currentTimeSong) {
        return Math.floor((state.song.currentTimeSong.currentTime / state.song.currentTimeSong.durationTime) * 100)
    }
}
const secondTimeSong = state => {
    if (state.song.currentTimeSong) {
        let second = Math.floor(state.song.currentTimeSong.currentTime % 60);
        return second < 10 ? '0' + second : second;

    }
}
const minuteTimeSong = state => {
    if (state.song.currentTimeSong) {
        let minute = Math.floor(state.song.currentTimeSong.currentTime / 60);
        return minute < 10 ? '0' + minute : minute;

    }
}

//actions
const { setSong, playSong, pauseSong, endedSong, timeUpdateSong, repeatSong, nextSong, prevSong, changeVolume, randomSong, changeTimeSong } = musicSlice.actions;

export { changeTimeSong, changeVolume, endedSong, minuteTimeSong, nextSong, pauseSong, playSong, prevSong, randomSong, repeatSong, secondTimeSong, setSong, timeProgress, timeUpdateSong };

//reducer
export const sliceSongReducer = musicSlice.reducer;



