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

            const exists = state.items.find(item => item.id === product.id);

            if (exists) {
                return;
            }

            state.items.push(action.payload);
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