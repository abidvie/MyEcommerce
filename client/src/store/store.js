import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice/authslice";
import adminPorductSlice from "./admin/product_slice";





const store=configureStore({
    reducer:{
        auth:AuthReducer,
        adminProduct:adminPorductSlice,
    }
})

export default store;