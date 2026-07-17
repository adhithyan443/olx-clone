import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, loginUser, registerUser } from "./authService";

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

export const register = createAsyncThunk(

    "auth/register",

    async (userData, thunkAPI) => {

        try {

            return await registerUser(userData);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                "Registration failed"

            );

        }

    }

);