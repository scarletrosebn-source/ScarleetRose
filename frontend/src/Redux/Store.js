import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import ownerSocialsReducer from './OwnerSocialsSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        ownerSocials: ownerSocialsReducer,
    },
});

export default store;