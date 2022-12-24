import { createSlice } from '@reduxjs/toolkit'


let initialState = { isLoggedIn: {} };


const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});


const { setLoginStatus } = loginStatusSlice.actions;
export { setLoginStatus };
export default loginStatusSlice.reducer;