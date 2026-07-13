import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunk";


const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        logout(state) {

            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");

        },

    },
    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                localStorage.setItem(
                    "token",
                    action.payload.token
                );
                state.isAuthenticated = true;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;