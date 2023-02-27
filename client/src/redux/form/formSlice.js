import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchForm,postForm,fetchFormDetail,deleteForm } from "./formThunk";

const initialState = {
    forms: [],
    isLoading:false,
    error:"",
    form:{}
}

export const formSlice = createSlice({
    name:'forms',
    initialState,
    reducers: {
      
        
    },
    extraReducers:(builder) =>{
      builder.addCase(fetchForm.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.forms = action.payload
      })
      builder.addCase(fetchFormDetail.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.form = action.payload
    })
    builder.addCase(postForm.fulfilled,(state,action)=>{
        state.isLoading = false;
     })
     builder.addCase(deleteForm.fulfilled,(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(fetchForm.pending,fetchFormDetail.pending,postForm.pending,deleteForm.pending),(state,action)=>{
        state.isLoading = true;
     })

     builder.addMatcher(isAnyOf(fetchForm.rejected,fetchFormDetail.rejected,postForm.rejected,deleteForm.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

      builder.addDefaultCase((state, action) => {})

     

    }
    
})

export default formSlice.reducer;