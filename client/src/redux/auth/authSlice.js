import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth : false,
    isLoading : false,
    error:"",
}

export const authSlice = createSlice({
    name:'departs',
    initialState,
    reducers: {
        onAuth: (state, action) => {
            state.auth = true
          },
        offAuth: (state,action) =>{
            state.auth = false
        }
    },
    
})
export const {  onAuth, offAuth} = authSlice.actions;

export default authSlice.reducer;