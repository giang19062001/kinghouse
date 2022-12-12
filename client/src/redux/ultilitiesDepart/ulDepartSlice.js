import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postUlDepart,deleteUlDepart,fetchUlDeparts } from "./ulDepartThunk";

const initialState = {
    ultilitiesDeparts: [],
    isLoading:false,
    error:"",
}

export const ulDepartSlice = createSlice({
    name:'ultilitiesDeparts',
    initialState,
    reducers: {
    },
    extraReducers:(builder) =>{
      builder.addCase(fetchUlDeparts.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.ultilitiesDeparts = action.payload
      })
     builder.addMatcher(isAnyOf(fetchUlDeparts.pending,postUlDepart.pending,deleteUlDepart.pending),(state,action)=>{
        state.isLoading = true;
     })

     builder.addMatcher(isAnyOf(fetchUlDeparts.rejected,postUlDepart.rejected,deleteUlDepart.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

      builder.addDefaultCase((state, action) => {})

     

    }
    
})

export default ulDepartSlice.reducer;