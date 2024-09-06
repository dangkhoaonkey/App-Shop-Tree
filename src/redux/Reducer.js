import { createSlice } from "@reduxjs/toolkit";
import { login } from "./UserAPI";
import { checkoutCart } from "./MainAPI";

const appSlice = createSlice({
    name: "app",
    initialState: {
        cart: [],
        user: null
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart
                .findIndex((item) => item._id.toString()
                    === action.payload._id.toString());
            if (index >= 0) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item._id.toString() === action.payload.toString());
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item._id.toString() === action.payload.toString());
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        quantityDisplay: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id.toString() !== action.payload.toString());
            
        },
        clearCart: (state) => {
            state.cart = [];
        },
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            console.log('pending');
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log(action.payload);
            console.log('rejected');
        });
        builder.addCase(checkoutCart.fulfilled, (state, action) => {

        })
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, quantityDisplay, removeFromCart, clearCart, logout } = appSlice.actions;
export default appSlice.reducer;