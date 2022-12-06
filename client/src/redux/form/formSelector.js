export const selectListForms= (state) => state.formSlice.forms
export const selectFormDetail= (state) => state.formSlice.form

export const selectLoadingForm= (state) => state.formSlice.isLoading
export const selectSuccessForm= (state) => state.formSlice.onSuccess
