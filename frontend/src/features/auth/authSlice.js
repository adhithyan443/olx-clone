import { createSlice } from "@reduxjs/toolkit";
import { loadUser, login, register } from "./authThunk";



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

                const { token, user } = action.payload.data;

                state.loading = false;
                state.token = token;
                state.user = user;
                state.isAuthenticated = true;
                localStorage.setItem("token", token);
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
            })

            .addCase(loadUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;

                localStorage.removeItem("token");
            })

            .addCase(register.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(register.fulfilled, (state) => {

                state.loading = false;

            })

            .addCase(register.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;