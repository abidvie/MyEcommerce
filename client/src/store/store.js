import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice/authslice";





const store=configureStore({
    reducer:{
        auth:AuthReducer
    }
})

export default store;