import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        modal: null,
        snackbard: null
    },
    reducers: {
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        closeModal: state => {
            state.modal = null;
        }
    }
});

export const {
    setModal,
    closeModal
} = appSlice.actions;

export default appSlice.reducer;
