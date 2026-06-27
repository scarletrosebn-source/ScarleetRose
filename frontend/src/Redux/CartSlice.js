import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        cartCount: localStorage.getItem("cartCount") ? JSON.parse(localStorage.getItem("cartCount")) : 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.cartCount += 1;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.cartCount -= 1;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
        },
        clearcart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cartCount");
        }
    }
})

export const { addToCart, removeFromCart, clearcart } = cartSlice.actions;
export default cartSlice.reducer;