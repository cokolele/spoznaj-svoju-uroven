import { configureStore } from "@reduxjs/toolkit";

import gallery from "src/state/gallerySlice.js";

export default configureStore({
    reducer: {
        gallery
    }
});
