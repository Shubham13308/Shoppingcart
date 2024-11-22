import { configureStore } from "@reduxjs/toolkit";
import productReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice'
import customerReducer from './features/customer/customerSlice'

const store = configureStore({
    reducer:{
        products:productReducer,
        cart:cartReducer,
        searchinput:customerReducer,
        customerdata:customerReducer
    }
})
export default store;