import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchServices,postService,deleteService } from "./serviceThunk";

const initialState = {
    services: [],
    isLoading:false,
    error:"",
}

export const serviceSlice = createSlice({
    name:'service',
    initialState,
    reducers: {
    },
    extraReducers:(builder) =>{
      builder.addCase(fetchServices.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.services = action.payload
      })
      builder.addMatcher(isAnyOf(postService.fulfilled,deleteService.fulfilled),(state,action)=>{
         state.isLoading = false;
      })
     builder.addMatcher(isAnyOf(fetchServices.pending,postService.pending,deleteService.pending),(state,action)=>{
        state.isLoading = true;
     })

     builder.addMatcher(isAnyOf(fetchServices.rejected,postService.rejected,deleteService.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

      builder.addDefaultCase((state, action) => {})

     

    }
    
})

export default serviceSlice.reducer;