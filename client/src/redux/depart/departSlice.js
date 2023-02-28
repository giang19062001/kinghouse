import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchDeparts,fetchDepartDetail,deleteDepart,deleteImage,updateDepart,updateImage,postDepart} from "./departThunk";

const initialState = {
    departs: [],
    isLoading:false,
    error:"",
    depart :{}
}

export const departSlice = createSlice({
    name:'departs',
    initialState,
    reducers: {

    },
    extraReducers:(builder) =>{
      builder.addCase(fetchDeparts.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.departs = action.payload
      })
      builder.addCase(fetchDepartDetail.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.depart = action.payload
    })
    builder.addMatcher(isAnyOf(postDepart.fulfilled,updateDepart.fulfilled,deleteImage.fulfilled,updateImage.fulfilled,deleteDepart.fulfilled),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(fetchDeparts.pending,fetchDepartDetail.pending,deleteDepart.pending,
      updateDepart.pending,deleteImage.pending,updateImage.pending,postDepart.pending),(state,action)=>{
        state.isLoading = true;
     })
     builder.addMatcher(isAnyOf(fetchDeparts.rejected,fetchDepartDetail.rejected,deleteDepart.rejected,
      updateDepart.rejected,deleteImage.rejected,updateImage.rejected,postDepart.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

      builder.addDefaultCase((state, action) => {})

     

    }
    
})

export default departSlice.reducer;