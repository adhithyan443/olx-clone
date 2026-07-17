import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCart,
    addProductToCart,
    removeProductFromCart,
    clearUserCart,
} from "./cartThunk";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })

            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Product
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })

            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove Product
            .addCase(removeProductFromCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    (item) => item.ProductID !== action.payload
                );
            })

            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear Cart
            .addCase(clearUserCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(clearUserCart.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
            })

            .addCase(clearUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;