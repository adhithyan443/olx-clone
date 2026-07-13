import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./authService";

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