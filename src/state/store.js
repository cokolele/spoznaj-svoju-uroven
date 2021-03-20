import { configureStore } from "@reduxjs/toolkit";

import app from "src/state/appSlice.js";
import gallery from "src/state/gallerySlice.js";

export default configureStore({
    reducer: {
        app,
        gallery
    }
});
