import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import productReducer from "../features/product/productSlice"
import cartReducer from "../features/cart/cartSlice"
import searchReducer from "../features/search/searchSlice";


export const store = configureStore({

    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        search: searchReducer,
    }
})