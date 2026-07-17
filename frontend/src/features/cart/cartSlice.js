import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const existingItem = state.items.find(item => item.id === product.id);

            if (!existingItem) {
                state.items.push(product)
            }
        },

        removeFromCart: (state, action) => {

            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.items = [];
        }

    }
});

export const {

    addToCart,
    removeFromCart,
    clearCart

} = cartSlice.actions;

export default cartSlice.reducer;