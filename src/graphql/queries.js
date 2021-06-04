/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
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
      entityType
      fein
      noFein
      ssn
      tin
      tinExpiration
      jointTaxes
      jointFirst
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
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        entityType
        fein
        noFein
        ssn
        tin
        tinExpiration
        jointTaxes
        jointFirst
        businessName
        dba
        businessImage
        businessAddressId
        agreeLexisNexis
        fullOwner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getScreen = /* GraphQL */ `
  query GetScreen($id: ID!) {
    getScreen(id: $id) {
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
export const listScreens = /* GraphQL */ `
  query ListScreens(
    $filter: ModelScreenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScreens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
