import { checkIfLoggedIn, toggleLoggedIn } from "./loginSlice";
import loginReducer from "./loginSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: loginReducer
})


export default store;