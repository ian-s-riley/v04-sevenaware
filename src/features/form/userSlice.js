import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateUser as updateUserMutation } from '../../graphql/mutations';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "",
    userId: "",
    formId: "",
    userType: "",    
    email: "",    
    password: "",
    prefix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    addressId: "",   
    title: "",
    profile: "",
    image: "",
    tin: "",
    ssn: "",
    idType: "",
    percentOwner: 0,
    sevenAwareAgree: false,
    status: "",
  },
  reducers: {
    updateUser: (state, action) => {
      //console.log('updateProfile: action', action)
      //console.log('updateProfile: state',state)
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.formId = action.payload.formId
      state.userType = action.payload.userType
      state.email = action.payload.email
      state.password = action.payload.password
      state.prefix = action.payload.prefix   
      state.firstName = action.payload.firstName      
      state.middleName = action.payload.middleName
      state.lastName = action.payload.lastName
      state.addressId = action.payload.addressId
      state.title = action.payload.title
      state.profile = action.payload.profile
      state.image = action.payload.image
      state.ssn = action.payload.ssn
      state.tin = action.payload.tin
      state.idType = action.payload.idType
      state.percentOwner = action.payload.percentOwner
      state.sevenAwareAgree = action.payload.sevenAwareAgree 
      state.status = action.payload.status 
    },
  },
});

export const { updateUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateUserAsync = user => dispatch => {
  console.log('updateUserAsync: user', user)
  API.graphql({ 
      query: updateUserMutation, 
      variables: { 
        input: {
          id: user.id,
          userId: user.userId,
          formId: user.formId,
          userType: user.userType,
          email: user.email,
          password: user.password,
          prefix: user.prefix,
          firstName: user.firstName,   
          middleName: user.middleName,
          lastName: user.lastName,
          addressId: user.addressId,          
          title: user.title,
          profile: user.profile,
          image: user.image,
          ssn: user.ssn,
          tin: user.tin,
          idType: user.idType,
          percentOwner: user.percentOwner,
          sevenAwareAgree: user.sevenAwareAgree,
          status: user.status,
        }
      } 
  })    
  dispatch(updateUser(user));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user;

export default userSlice.reducer;