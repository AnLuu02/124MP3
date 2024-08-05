import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../FireBase/firebaseConfig';

const initialStateModal = {
    isShow: false,
    type: "",
    data: {},
    listData: []
}
//reducers
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialStateModal,
    reducers: {
        toggleModal: (state, actions) => {
            console.log(actions.payload);

            state.isShow = actions.payload?.show;
            state.type = actions.payload?.type;
        },
        setData: (state, actions) => {
            state.data = { ...actions.payload }
        },
        setAllData: (state, actions) => {
            state.data = [...state.listData, ...actions.payload]
        },
        clearData: (state) => {
            state.data = {}
        },
        clearAllData: (state) => {
            state.listData = []
        }

    }
})


export const handleShowModal = (type) => (dispatch) => {
    dispatch(toggleModal({ show: true, type }));
};

export const handleHideModal = () => (dispatch) => {
    dispatch(toggleModal({ show: false, type: "" }));
};

export const addPlaylist = async (dispatch, data) => {
    try {
        const { id } = await addDoc(collection(db, "playlists"), data);
        dispatch(setAllData({ id, ...data })); // Thay thế bằng hành động riêng biệt
        console.log(`Document written with ID: ${id}`);
    } catch (error) {
        console.error(`Error adding document: ${error}`);
        dispatch(setAllData(error.message)); // Dispatch lỗi để xử lý thích hợp
    }
};

// export const addData = async (dispatch, data) => {
//     try {
//         const { id } = await addDoc(collection(db, "playlists"), data);
//         dispatch(addDataSuccess({ id, ...data })); // Thay thế bằng hành động riêng biệt
//         console.log(`Document written with ID: ${id}`);
//     } catch (error) {
//         console.error(`Error adding document: ${error}`);
//         dispatch(addDataError(error.message)); // Dispatch lỗi để xử lý thích hợp
//     }
// };


// export const getData = async (dispatch, playlistId) => {
//     try {
//         const playlistRef = doc(db, "playlists", playlistId);
//         const docSnap = await getDoc(playlistRef);
//         if (docSnap.exists()) {
//             dispatch(setData({ id: playlistId, ...docSnap.data() }));
//         } else {
//             console.error(`Error fetching playlist`);
//         }
//     } catch (error) {
//         console.error(`Error fetching playlist: ${error}`);
//     }
// };
export const fetchPlaylist = async (dispatch, playlistId) => {
    try {
        const playlistRef = doc(db, "playlists", playlistId);
        const docSnap = await getDoc(playlistRef);
        if (docSnap.exists()) {
            dispatch(setData({ id: playlistId, ...docSnap.data() }));
        } else {
            // dispatch(setError(`Playlist not found: ${playlistId}`));
        }
    } catch (error) {
        console.error(`Error fetching playlist: ${error}`);
        // dispatch(setError(`Failed to fetch playlist: ${error.message}`));
    }
};
// export const geAlltData = async (dispatch) => {
//     try {
//         const querySnapshot = await getDocs(collection(db, "playlists"));
//         const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         dispatch(setAllData(data));
//     } catch (error) {
//         console.error("Error fetching all data:", error);
//         // Xử lý lỗi thích hợp, ví dụ: dispatch(setError(error.message))
//     }
// };


export const fetchAllData = async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "playlists"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch(setAllData(data));
    } catch (error) {
        console.error("Error fetching all data:", error);
        // Xử lý lỗi thích hợp, ví dụ: dispatch(setError(error.message))
    }
};


export const updatePlaylist = async (dispatch, playlistId, updates) => {
    try {
        const playlistRef = doc(db, "playlists", playlistId);
        await updateDoc(playlistRef, updates);
        dispatch(setData({ id: playlistId, updates }));
    } catch (error) {
        console.error(`Error updating playlist: ${error}`);
        // dispatch(updatePlaylistError(error.message));
    }
};

export const deletePlaylist = async (playlistId) => {
    try {
        await deleteDoc(doc(db, "playlists", playlistId));
        // dispatch(deletePlaylistSuccess(playlistId));
    } catch (error) {
        console.error(`Error deleting playlist: ${error}`);
        // dispatch(deletePlaylistError(error.message));
    }
};
//actions
export const { toggleModal, setData, setAllData, clearData, clearAllData } = modalSlice.actions;
export const sliceModalReducer = modalSlice.reducer;

