import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateNotification as updateNotificationMutation } from '../../graphql/mutations';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: [
    {
      id: "",
      fromUserId: "",
      toUserId: "",
      fromEmail: "",
      toEmail: "",
      action: "",
      status: "UNREAD",
      badgeColor: "success",
      badgeIcon: "",
      title: "",
      body: "",
      footerTitle: "",
      footer: "",
    }
  ],
  reducers: {
    updateNotification: (state, action) => {
      //console.log('updateNotification: action', action)
      //console.log('updateNotification: state',state)
      state.id = action.payload.id
      state.fromUserId = action.payload.fromUserId
      state.toUserId = action.payload.toUserId
      state.fromEmail = action.payload.fromEmail
      state.toEmail = action.payload.toEmail
      state.action = action.payload.action
      state.status = action.payload.status
      state.badgeColor = action.payload.badgeColor
      state.badgeIcon = action.payload.badgeIcon
      state.title = action.payload.title
      state.body = action.payload.body
      state.footerTitle = action.payload.footerTitle
      state.footer = action.payload.footer
    },
  },
});

export const { updateNotification } = notificationSlice.actions;

// The function below is called a thunk and allows us to pernotification async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateNotificationAsync = notification => dispatch => {
  console.log('updateNotificationAsync: notification', notification)
  API.graphql({ 
      query: updateNotificationMutation, 
      variables: { 
        input: {
          id: notification.id, 
          fromUserId: notification.fromUserId,
          toUserId: notification.toUserId,
          fromEmail: notification.fromEmail,
          toEmail: notification.toEmail,
          action: notification.action,
          status: notification.status,
          badgeColor: notification.badgeColor,
          badgeIcon: notification.badgeIcon,
          title: notification.title,
          body: notification.body,
          footerTitle: notification.footerTitle,
          footer: notification.footer,
        }
      } 
  })    
  dispatch(updateNotification(notification));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNotification = state => state.notification;

export default notificationSlice.reducer;