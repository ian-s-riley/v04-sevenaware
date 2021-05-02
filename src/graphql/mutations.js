/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
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
export const updateForm = /* GraphQL */ `
  mutation UpdateForm(
    $input: UpdateFormInput!
    $condition: ModelFormConditionInput
  ) {
    updateForm(input: $input, condition: $condition) {
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
export const deleteForm = /* GraphQL */ `
  mutation DeleteForm(
    $input: DeleteFormInput!
    $condition: ModelFormConditionInput
  ) {
    deleteForm(input: $input, condition: $condition) {
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
export const createScreen = /* GraphQL */ `
  mutation CreateScreen(
    $input: CreateScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    createScreen(input: $input, condition: $condition) {
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
export const updateScreen = /* GraphQL */ `
  mutation UpdateScreen(
    $input: UpdateScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    updateScreen(input: $input, condition: $condition) {
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
export const deleteScreen = /* GraphQL */ `
  mutation DeleteScreen(
    $input: DeleteScreenInput!
    $condition: ModelScreenConditionInput
  ) {
    deleteScreen(input: $input, condition: $condition) {
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
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      action
      status
      badgeColor
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      action
      status
      badgeColor
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      fromEmail
      toEmail
      action
      status
      badgeColor
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
      footer
      createdAt
      updatedAt
    }
  }
`;
