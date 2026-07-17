
import { createSlice } from "@reduxjs/toolkit";
import { createProducts, fetchMyProducts, fetchProducts, fetchProductsById, updateProduct, deleteProduct } from "./productThunk";


const initialState = {
    products: [],
    myProducts: [],
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchProductsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.data;
            })
            .addCase(fetchProductsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })

            .addCase(createProducts.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(fetchMyProducts.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchMyProducts.fulfilled, (state, action) => {

                state.loading = false;

                state.myProducts = action.payload.data;

            })

            .addCase(fetchMyProducts.rejected, (state, action) => {
                console.log("Payload" + action.payload);
                state.loading = false;

                state.error = action.payload;

            })


            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateProduct.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default productSlice.reducer;