
import loginStatusReducer from "./loginSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: { loginStatus: loginStatusReducer }
})


export default store;