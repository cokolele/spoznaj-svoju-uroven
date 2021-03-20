import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        categoryIds: [], //endpoint data dont come with ID, has to be mapped
        categoryList: {},
        categoryListComplete: false,
        backgroundImageUrl: "/images/default-background.jpg"
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
        addCategory: (state, action) => {
            const id = action.payload.path;

            state.categoryIds.push(id);
            state.categoryList[id] = action.payload;
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter((category, i) => i != action.payload);
        },

        setBackgroundImageUrl: (state, action) => {
            state.backgroundImageUrl = action.payload;
        }
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
