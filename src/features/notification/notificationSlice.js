import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { createNotification as createNotificationMutation } from '../../graphql/mutations';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    fromUserId: "",
    toUserId: "",
    fromEmail: "",
    toEmail: "",
    fromName: "",
    toName: "",
    action: "",
    status: "",
    badgeColor: "",
    badgeIcon: "",
    title: "",
    body: "",
    htmlBody: "",
    emailBody: "",
    smsBody: "",
    footerTitle: "",
    footer: "",   
  },
});

export const createNotificationAsync = notification => dispatch => {
    console.log('createNotificationAsync: notification', notification)
    API.graphql({ 
        query: createNotificationMutation, 
        variables: { 
          input: {
            fromUserId: notification.fromUserId,
            toUserId: notification.toUserId,
            fromEmail: notification.fromEmail,
            toEmail: notification.toEmail,
            fromName: notification.fromName,
            toName: notification.toName,
            action: notification.action,
            status: notification.status,
            badgeColor: notification.badgeColor,
            badgeIcon: notification.badgeIcon,
            title: notification.title,
            body: notification.body,
            htmlBody: notification.htmlBody,
            emailBody: notification.emailBody,
            smsBody: notification.smsBody,
            footerTitle: notification.footerTitle,
            footer: notification.footer,   
          }
        } 
    })
    .then (data => {
        //console.log(data)      
        console.log('createNotificationAsync: data', data)  
    }) 
  };

export default notificationSlice.reducer;