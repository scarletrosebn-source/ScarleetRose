import { createSlice } from "@reduxjs/toolkit";

const updateCart = (state) => {
  state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("cartCount", JSON.stringify(state.cartCount));
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartCount: localStorage.getItem("cartCount") ? JSON.parse(localStorage.getItem("cartCount")) : 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const currentCartItem = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === currentCartItem.id);

      if (existingItem) {
        // Calculate total quantity after adding this item
        const newQuantity = existingItem.quantity + currentCartItem.quantity;

        // Prevent quantity from exceeding available stock
        existingItem.quantity = Math.min(newQuantity, currentCartItem.stock);
      } else {
        // Add new product to the cart
        state.cartItems.push({
          ...currentCartItem,
          quantity: Math.min(currentCartItem.quantity, currentCartItem.stock),
        });
      }

      // Recalculate total items in the cart
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      const currentCartItem = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== currentCartItem.id);
      updateCart(state);
    },
    clearcart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;

      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
    },
    incrementQuantity: (state, action) => {
      const currentCartItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === currentCartItem.id);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, currentCartItem.stock);
      }
      updateCart(state);
    },
    decrementQuantity: (state, action) => {
      const currentCartItem = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === currentCartItem.id);

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== currentCartItem.id);
      } else {
        existingItem.quantity--;
      }
      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, clearcart , incrementQuantity, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;
