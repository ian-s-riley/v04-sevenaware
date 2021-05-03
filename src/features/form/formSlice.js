import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { updateForm as updateFormMutation } from '../../graphql/mutations';
import { createForm as createFormMutation } from '../../graphql/mutations';

export const formSlice = createSlice({
  name: 'form',
  initialState: {      
    id: "",
    userId: "",
    screenId: "",
    screenNavigation: "", 
    percentComplete: 0,
    loanAmount: 0,           
    restricted: null,
    restrictedSpeculative: null,
    restrictedCoins: null,
    restrictedLending: null,
    restrictedPackaging: null,
    restrictedPyramid: null,
    restrictedIllegal: null,
    restrictedGambling: null,
    ineligible: null,
    ineligibleNonProfit: null,
    ineligibleRealestate: null,
    ineligibleLending: null,
    ineligiblePyramid: null,
    ineligibleGambling: null,
    ineligibleIllegal: null,
    forProfit: null,
    us: null,
    fein: "",
    businessName: "",
    dba: "",
    businessAddressId: "",
    agreeLexisNexis: false,
    fullOwner: null,
  },
  reducers: {
    updateForm: (state, action) => {
      //console.log('updateForm: action', action)
      //console.log('updateForm: state',state)
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.screenId = action.payload.screenId
      state.screenNavigation = action.payload.screenNavigation
      state.percentComplete = action.payload.percentComplete 
      state.loanAmount = action.payload.loanAmount    
      state.restricted = action.payload.restricted     
      state.restrictedSpeculative = action.payload.restrictedSpeculative
      state.restrictedCoins = action.payload.restrictedCoins
      state.restrictedLending = action.payload.restrictedLending
      state.restrictedPackaging = action.payload.restrictedPackaging
      state.restrictedPyramid = action.payload.restrictedPyramid
      state.restrictedIllegal = action.payload.restrictedIllegal
      state.restrictedGambling = action.payload.restrictedGambling
      state.ineligible = action.payload.ineligible
      state.ineligibleNonProfit = action.payload.ineligibleNonProfit
      state.ineligibleRealestate = action.payload.ineligibleRealestate
      state.ineligibleLending = action.payload.ineligibleLending
      state.ineligiblePyramid = action.payload.ineligiblePyramid
      state.ineligibleGambling = action.payload.ineligibleGambling
      state.ineligibleIllegal = action.payload.ineligibleIllegal
      state.forProfit = action.payload.forProfit
      state.us = action.payload.us
      state.fein = action.payload.fein
      state.businessName = action.payload.businessName
      state.dba = action.payload.dba
      state.businessAddressId = action.payload.businessAddressId
      state.agreeLexisNexis = action.payload.agreeLexisNexis   
      state.fullOwner = action.payload.fullOwner
    },
  },
});

export const { updateFormStatus, updateForm } = formSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateFormAsync = form => dispatch => {
  console.log('updateFormAsync: form', form)
  API.graphql({ 
      query: updateFormMutation, 
      variables: { 
        input: {
          id: form.id,
          userId: form.userId, 
          screenId: form.screenId,
          screenNavigation: form.screenNavigation,
          loanAmount: form.loanAmount,
          percentComplete: form.percentComplete,
          restricted: form.restricted,
          restrictedSpeculative: form.restrictedSpeculative,
          restrictedCoins: form.restrictedCoins,
          restrictedLending: form.restrictedLending,
          restrictedPackaging: form.restrictedPackaging,
          restrictedPyramid: form.restrictedPyramid,
          restrictedIllegal: form.restrictedIllegal,
          restrictedGambling: form.restrictedGambling,
          ineligible: form.ineligible,
          ineligibleNonProfit: form.ineligibleNonProfit,
          ineligibleRealestate: form.ineligibleRealestate,
          ineligibleLending: form.ineligibleLending,
          ineligiblePyramid: form.ineligiblePyramid,
          ineligibleGambling: form.ineligibleGambling,
          ineligibleIllegal: form.ineligibleIllegal,
          forProfit: form.forProfit,
          us: form.us,
          fein: form.fein,
          businessName: form.businessName,
          dba: form.dba,
          businessAddressId: form.businessAddressId,
          agreeLexisNexis: form.agreeLexisNexis,
          fullOwner: form.fullOwner,
        }
      } 
  })    
  dispatch(updateForm(form));
};

export const createFormAsync = form => dispatch => {
  //console.log('createForm: form', form)
  const formFromAPI = API.graphql({ 
      query: createFormMutation, 
      variables: { 
        input: {
          userId: form.userId, 
          screenId: "Start",
          screenNavigation: "Start",
          percentComplete:0,
          loanAmount: 0,
          forProfit: true,
          us: true,
        }
      } 
  })
  .then (data => {
    console.log(data)
  }) 
  console.log('createForm: formFromAPI', formFromAPI)  
  //const newFormId = formFromAPI.data.createForm.id
  // const newForm = {
  //   ...formFromAPI, 
  //   id: newFormId,
  // }
  // dispatch(updateForm(newForm));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForm = state => state.form;

export default formSlice.reducer;