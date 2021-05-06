import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    userId: null,    
    userName: "", 
    userType: "Borrower",
    formId: null,    
    screenId: "",  
    screenNavigation: ["Start"],

    // userName: "Mike B.", 
    // userType: "Lender",
    // userId: "96e2c4aa-f2e2-4fde-b66e-7459a04d93f8",    
    // formId: "",    
  },
  reducers: {
    updateNavigation: (state, action) => {
      console.log("navigationSlice.js - udpateNavigation - action", action)
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.userType = action.payload.userType
      state.formId = action.payload.formId
      state.screenId = action.payload.screenId
      state.screenNavigation = action.payload.screenNavigation
    },
  },
});

export const { updateNavigation } = navigationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNavigation = state => state.navigation

export default navigationSlice.reducer;