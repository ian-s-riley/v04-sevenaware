import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateAddress as updateAddressMutation } from '../../graphql/mutations';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {      
    id: "",
    userId: "",  
    addressType: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    zipPlus4: "",
    county: "",
    country: "",
  },
  reducers: {
    updateAddress: (state, action) => {
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.addressType = action.payload.addressType
      state.address1 = action.payload.address1
      state.address2 = action.payload.address2
      state.city = action.payload.city
      state.state = action.payload.state
      state.zip = action.payload.zip
      state.zipPlus4 = action.payload.zipPlus4
      state.county = action.payload.county
      state.country = action.payload.country
    },
  },
});

export const { updateAddress } = addressSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateAddressAsync = address => dispatch => {
  console.log('updateAddressAsync: address', address)
  API.graphql({ 
      query: updateAddressMutation, 
      variables: { 
        input: {
          id: address.id,
          userId: address.userId,  
          addressType: address.addressType,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          state: address.state,
          zip: address.zip,
          zipPlus4: address.zipPlus4,
          county: address.county,
          country: address.country,
          
        }
      } 
  })    
  dispatch(updateAddress(address));
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAddress = state => state.address;

export default addressSlice.reducer;