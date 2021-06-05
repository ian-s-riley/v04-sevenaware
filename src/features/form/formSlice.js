import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

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
    forProfit: true,
    us: true,
    businessEmail: "",
    entityType: "",
    fein: "",
    noFein: false,
    ssn: "",
    tin: "",
    tinExpiration: null,
    jointTaxes: false,
    jointFirst: true,
    jointFirstSsn: "",
    jointFirstTin: "",
    businessTin: "",
    businessTinType: "",
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
      state.businessEmail = action.payload.businessEmail
      state.entityType = action.payload.entityType
      state.fein = action.payload.fein
      state.noFein = action.payload.noFein
      state.ssn = action.payload.ssn
      state.tin = action.payload.tin
      state.tinExpiration = action.payload.tinExpiration
      state.jointTaxes = action.payload.jointTaxes
      state.jointFirst = action.payload.jointFirst
      state.jointFirstSsn = action.payload.jointFirstSsn
      state.jointFirstTin = action.payload.jointFirstTin
      state.businessTin = action.payload.businessTin
      state.businessTinType = action.payload.businessTinType
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
          businessEmail: form.businessEmail,
          entityType: form.entityType,
          fein: form.fein,
          noFein: form.noFein,
          ssn: form.ssn,
          tin: form.tin,
          tinExpiration: form.tinExpiration,
          jointTaxes: form.jointTaxes,
          jointFirst: form.jointFirst,
          jointFirstSsn: form.jointFirstSsn,
          jointFirstTin: form.jointFirstTin,
          businessTin: form.businessTin,
          businessTinType: form.businessTinType,
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


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForm = state => state.form;

export default formSlice.reducer;