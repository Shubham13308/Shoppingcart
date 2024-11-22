import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    products:[],
    category:[],
    isLoading:true,
    error:null,
    categoryfilter:[],
    showModal:false
}
const productsSlice= createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setCategory:(state,action)=>{
            state.category=action.payload

        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setCategoryFilter:(state,action)=>{
            state.categoryfilter=action.payload
        },
        setShowModal:(state,action)=>{
            state.showModal=action.payload
        }
        

    },
})
export const {setProducts,setCategory, setLoading, setError,setCategoryFilter,setShowModal}=productsSlice.actions;
export default productsSlice.reducer