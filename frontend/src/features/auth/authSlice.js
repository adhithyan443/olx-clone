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

                const { token, user } = action.payload.data;

                state.loading = false;
                state.token = token;
                state.user = user;
                state.isAuthenticated = true;
                localStorage.setItem("token", token);
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.data.token;
            });
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;