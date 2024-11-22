import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchinput:'',
    customerdata:''
}
const customerSlice= createSlice({
    name:"searchinput",
    initialState,
    reducers:{
        setSearchInput:(state,action)=>{
            state.searchinput=action.payload
        },
        setCustomerData:(state,action)=>{
            state.customerdata=action.payload
        }
    }
})
export const {setSearchInput,setCustomerData}=customerSlice.actions
export default customerSlice.reducer