import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, loginUser } from "./authService";

export const login = createAsyncThunk(

    "auth/login",

    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",

    async (_, thunkAPI) => {

        try {
            return await getProfile();
        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Unauthorized"
            )
        }
    }
)