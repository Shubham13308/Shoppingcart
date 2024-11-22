import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantities: Array(15).fill(1),
    isAdded: Array(15).fill(false),
    stock:[],
    stockCount:[],
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state, action) => { 
            state.quantities[action.payload] += 1;
        },
        decrementQuantity: (state, action) => { 
            if (state.quantities[action.payload] > 1) {
                state.quantities[action.payload] -= 1;
            }
        },
        toggleAddToCart: (state, action) => {
            state.isAdded[action.payload] = !state.isAdded[action.payload];
        },
        setStock: (state, action) => {
            state.stock = action.payload;  
        },
        setStockCount:(state,action)=>{
            state.stockCount=action.payload;
        },
        resetStock: (state) => {
            state.stockCount = null;
            state.stock = null;
          },
        updateCart(state, action) {
            const updatedCartItems = action.payload;
            state.cartItems = updatedCartItems;
          },
        
        
    }
});

export const { incrementQuantity, decrementQuantity, toggleAddToCart ,setStock,setStockCount ,updateCart} = cartSlice.actions;
export default cartSlice.reducer;
