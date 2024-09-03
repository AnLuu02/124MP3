import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
    isShow: false,
    type: "",
}
//reducers
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialStateModal,
    reducers: {
        toggleModal: (state, actions) => {
            state.isShow = actions.payload?.show;
            state.type = actions.payload?.type;
            state.objData = { ...actions.payload?.objData };
        },
    }
})
export const handleShowModal = (type, objData) => (dispatch) => {
    dispatch(toggleModal({ show: true, type, objData }));
};

export const handleHideModal = () => (dispatch) => {
    dispatch(toggleModal({ show: false, type: "", objectData: {} }));
};
//actions
export const { toggleModal, setData, setAllData, clearData, clearAllData } = modalSlice.actions;
export const sliceModalReducer = modalSlice.reducer;

