import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const postStore = configureStore({
    reducer:{
        postReducer:postSlice
    }
})

export default postStore