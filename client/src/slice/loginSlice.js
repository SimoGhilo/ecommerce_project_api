import { createSlice } from '@reduxjs/toolkit'


let initialState = { isLoggedIn: false };


const loginSlice = createSlice({
    name: 'isLoggedIn',
    initialState: initialState,
    reducers: {
        checkIfLoggedIn: (state, action) => { if (state.isLoggedIn === true) { return true; } else { return false; } },

        toggleLoggedIn: (state, action) => { if (state.isLoggedIn === false) { return true; } else { return false; } }
    }
});


const { checkIfLoggedIn, toggleLoggedIn } = loginSlice.actions;
export { checkIfLoggedIn, toggleLoggedIn };
export default loginSlice.reducer;