import { combineReducers } from 'redux';
import { sliceUserReducer } from './userReducer';

import { sliceListSongReducer } from './listSongReducer';
import { sliceModalReducer } from './ModalReducer/modalReducer';
import { sliceSongReducer } from './songReducer';

const rootReducer = combineReducers({
    user: sliceUserReducer,
    song: sliceSongReducer,
    listSong: sliceListSongReducer,
    modal: sliceModalReducer
});

export default rootReducer;