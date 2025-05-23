import { configureStore } from "@reduxjs/toolkit";
import LoaderReducer from "../reducers/LoaderReducer";
const Store=configureStore({
    reducer:{
        loaderReducer:LoaderReducer,

    }
})
export default Store;