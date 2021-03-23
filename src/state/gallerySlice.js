import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        categoryIds: [],
        categoryList: {},
        categoryListComplete: false
    },
    reducers: {
        setCategories: (state, action) => {
            state.categoryIds = [];
            action.payload.forEach(category => {
                const id = category.path;

                state.categoryIds.push(id);
                if (!state.categoryList[id])
                    state.categoryList[id] = category;
            })
            state.categoryListComplete = true;
        },
        setCategory: (state, action) => {
            if (!state.categoryList[action.payload.id]) {
                state.categoryIds.push(action.payload.id);
                state.categoryList[action.payload.id] = action.payload.category;
            } else {
                state.categoryList[action.payload.id] = {
                    ...state.categoryList[action.payload.id],
                    ...action.payload.category
                };
            }
        },
    }
});

export const {
    setCategories,
    setCategory,
    addCategory,
    removeCategory,
    setBackgroundImageUrl
} = gallerySlice.actions;

export default gallerySlice.reducer;
