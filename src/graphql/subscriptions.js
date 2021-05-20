/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      userId
      formId
      userType
      email
      password
      preifx
      firstName
      middleName
      lastName
      suffix
      addressId
      title
      profile
      image
      tin
      ssn
      idType
      percentOwner
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      userId
      formId
      userType
      email
      password
      preifx
      firstName
      middleName
      lastName
      suffix
      addressId
      title
      profile
      image
      tin
      ssn
      idType
      percentOwner
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      userId
      formId
      userType
      email
      password
      preifx
      firstName
      middleName
      lastName
      suffix
      addressId
      title
      profile
      image
      tin
      ssn
      idType
      percentOwner
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm {
    onCreateForm {
      id
      userId
      formId
      sopVersion
      loanAmount
      screenId
      screenNavigation
      percentComplete
      restricted
      restrictedSpeculative
      restrictedCoins
      restrictedLending
      restrictedPackaging
      restrictedPyramid
      restrictedIllegal
      restrictedGambling
      ineligible
      ineligibleNonProfit
      ineligibleRealestate
      ineligibleLending
      ineligiblePyramid
      ineligibleGambling
      ineligibleIllegal
      forProfit
      us
      businessEmail
      fein
      businessName
      dba
      businessImage
      businessAddressId
      agreeLexisNexis
      fullOwner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm {
    onUpdateForm {
      id
      userId
      formId
      sopVersion
      loanAmount
      screenId
      screenNavigation
      percentComplete
      restricted
      restrictedSpeculative
      restrictedCoins
      restrictedLending
      restrictedPackaging
      restrictedPyramid
      restrictedIllegal
      restrictedGambling
      ineligible
      ineligibleNonProfit
      ineligibleRealestate
      ineligibleLending
      ineligiblePyramid
      ineligibleGambling
      ineligibleIllegal
      forProfit
      us
      businessEmail
      fein
      businessName
      dba
      businessImage
      businessAddressId
      agreeLexisNexis
      fullOwner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm {
    onDeleteForm {
      id
      userId
      formId
      sopVersion
      loanAmount
      screenId
      screenNavigation
      percentComplete
      restricted
      restrictedSpeculative
      restrictedCoins
      restrictedLending
      restrictedPackaging
      restrictedPyramid
      restrictedIllegal
      restrictedGambling
      ineligible
      ineligibleNonProfit
      ineligibleRealestate
      ineligibleLending
      ineligiblePyramid
      ineligibleGambling
      ineligibleIllegal
      forProfit
      us
      businessEmail
      fein
      businessName
      dba
      businessImage
      businessAddressId
      agreeLexisNexis
      fullOwner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateScreen = /* GraphQL */ `
  subscription OnCreateScreen {
    onCreateScreen {
      id
      formId
      sopVersion
      userType
      percentComplete
      stage
      stageHeader
      stageText
      stagePercentComplete
      step
      stepHeader
      stepText
      stepPercentComplete
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateScreen = /* GraphQL */ `
  subscription OnUpdateScreen {
    onUpdateScreen {
      id
      formId
      sopVersion
      userType
      percentComplete
      stage
      stageHeader
      stageText
      stagePercentComplete
      step
      stepHeader
      stepText
      stepPercentComplete
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteScreen = /* GraphQL */ `
  subscription OnDeleteScreen {
    onDeleteScreen {
      id
      formId
      sopVersion
      userType
      percentComplete
      stage
      stageHeader
      stageText
      stagePercentComplete
      step
      stepHeader
      stepText
      stepPercentComplete
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      county
      country
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      county
      country
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      county
      country
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      fromName
      toName
      action
      status
      badgeColor
      badgeIcon
      title
      body
      htmlBody
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      fromName
      toName
      action
      status
      badgeColor
      badgeIcon
      title
      body
      htmlBody
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      fromName
      toName
      action
      status
      badgeColor
      badgeIcon
      title
      body
      htmlBody
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
