import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postUlHome,deleteUlHome,fetchUlHomes } from "./ulHomeThunk";

const initialState = {
    ultilitiesHomes: [],
    isLoading:false,
    error:"",
}

export const ulHomeSlice = createSlice({
    name:'ultilitiesHomes',
    initialState,
    reducers: {
    },
    extraReducers:(builder) =>{
      builder.addCase(fetchUlHomes.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.ultilitiesHomes = action.payload
      })
      builder.addMatcher(isAnyOf(postUlHome.fulfilled,deleteUlHome.fulfilled),(state,action)=>{
         state.isLoading = false;
      })
     builder.addMatcher(isAnyOf(fetchUlHomes.pending,postUlHome.pending,deleteUlHome.pending),(state,action)=>{
        state.isLoading = true;
     })

     builder.addMatcher(isAnyOf(fetchUlHomes.rejected,postUlHome.rejected,deleteUlHome.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

      builder.addDefaultCase((state, action) => {})

     

    }
    
})

export default ulHomeSlice.reducer;