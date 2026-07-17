import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
} from "./cartService";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",

    async (_, thunkAPI) => {
        try {
            return await getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch cart"
            );
        }
    }
);

export const addProductToCart = createAsyncThunk(
    "cart/addProduct",

    async (productId, thunkAPI) => {
        try {
            await addToCart(productId);

            // Refresh cart after adding
            return await getCart();

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add product"
            );
        }
    }
);

export const removeProductFromCart = createAsyncThunk(
    "cart/removeProduct",

    async (productId, thunkAPI) => {
        try {
            await removeFromCart(productId);

            return productId;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to remove product"
            );
        }
    }
);

export const clearUserCart = createAsyncThunk(
    "cart/clear",

    async (_, thunkAPI) => {
        try {
            await clearCart();

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to clear cart"
            );
        }
    }
);