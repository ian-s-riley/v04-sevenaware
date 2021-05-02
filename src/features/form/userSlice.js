import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateUser as updateUserMutation } from '../../graphql/mutations';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "70213c91-7f7a-4790-8146-cb26cb13daf8",
    userId: "",
    userType: "",    
    email: "",    
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    zipPlus4: "",
    title: "",
    profile: "",
    image: "",
    sevenAwareAgree: false,
  },
  reducers: {
    updateUser: (state, action) => {
      //console.log('updateProfile: action', action)
      //console.log('updateProfile: state',state)
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.userType = action.payload.userType
      state.email = action.payload.email
      state.password = action.payload.password
      state.firstName = action.payload.firstName      
      state.middleName = action.payload.middleName
      state.lastName = action.payload.lastName
      state.address1 = action.payload.address1
      state.address2 = action.payload.address2
      state.city = action.payload.city
      state.state = action.payload.state
      state.zip = action.payload.zip
      state.zipPlus4 = action.payload.zipPlus4
      state.title = action.payload.title
      state.profile = action.payload.profile
      state.image = action.payload.image
      state.sevenAwareAgree = action.payload.sevenAwareAgree 
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
          userType: user.userType,
          email: user.email,
          password: user.password,
          firstName: user.firstName,   
          middleName: user.middleName,
          lastName: user.lastName,
          address1: user.address1,
          address2: user.address2,
          city: user.city,
          state: user.state,
          zip: user.zip, 
          zipPlus4: user.zipPlus4,
          title: user.title,
          profile: user.profile,
          image: user.image,
          sevenAwareAgree: user.sevenAwareAgree,
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