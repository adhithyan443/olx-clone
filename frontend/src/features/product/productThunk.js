
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts, createProduct, getMyProducts, updateProduct as updateProductService } from "./productService";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",

    async (params, thunkAPI) => {
        try {
            return await getProducts(params)

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)

export const fetchProductsById = createAsyncThunk(
    "products/getProductById",

    async (id, thunkAPI) => {

        try {
            return await getProductById(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch product"
            );
        }
    }
)

export const createProducts = createAsyncThunk(

    "products/createProduct",

    async (data, thunkAPI) => {
        try {
            return await createProduct(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create product"
            );
        }
    }
)

export const fetchMyProducts = createAsyncThunk(
    "products/fetchMyProducts",

    async (_, thunkAPI) => {

        try {

            return await getMyProducts();

        } catch (error) {
            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                "Failed to fetch products"

            );
        }
    }
)


export const updateProduct = createAsyncThunk(
    "products/updateProduct",

    async ({ id, data }, thunkAPI) => {
        try {
            return await updateProductService(id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update product"
            );
        }
    }
);