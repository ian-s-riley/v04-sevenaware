/*eslint-disable*/
import React, { useState, useEffect } from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

// redux store
import { useSelector } from 'react-redux';
import {
  selectForm,
} from 'features/form/formSlice'
import {
  selectNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Form,
  Input
} from "reactstrap";

// core components
import AuthNavBar from "components/Navbars/AuthNavBar.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import FooterAuth from "components/Footers/FooterAuth.js";
import FooterWhite from "components/Footers/FooterWhite.js";
import FooterGray from "components/Footers/FooterGray.js";


import Restricted from "./opportunity-sections/Restricted";
import RestrictedYes from "./opportunity-sections/RestrictedYes";
import Ineligible from "./opportunity-sections/Ineligible";
import IneligibleYes from "./opportunity-sections/IneligibleYes";
import ForProfit from "./opportunity-sections/ForProfit";
import ForProfitNo from "./opportunity-sections/ForProfitNo";
import US from "./opportunity-sections/US";
import USNo from "./opportunity-sections/USNo";
import Eligible from "./opportunity-sections/Eligible";
import ProfileStart from "./opportunity-sections/ProfileStart";
import ProfileSignUp from "./opportunity-sections/ProfileSignUp";


function Opportunity() {
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)
  const [form, setForm] = useState(useSelector(selectForm))
  const [screenHeader, setScreenHeader] = useState("Eligibility>Restricted")
  const [authState, setAuthState] = useState("eligibility") 

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    const screenId = screenNavigation.slice(-1)[0];
    console.log('Opportunity.js - showForm - screenId', screenId)

    switch (screenId) {
      case "Profile>ConfirmSignUp":
          setScreenHeader("Verify 7(a)ware Account Profile")
          setCurrentForm(<ProfileConfirmSignUp nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>SignUp":
            setScreenHeader("7(a)ware Account Profile")
            setCurrentForm(<ProfileSignUp nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
        case "Profile>Start":
            setScreenHeader("Thank you for beginning the loan application process.")
            setCurrentForm(<ProfileStart nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
        case "Eligibility>Eligible":
            setScreenHeader("It looks like your business is eligible for a 7(a) loan.")
            setCurrentForm(<Eligible nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>US>No":
            setScreenHeader("Eligibility Warning")
            setCurrentForm(<USNo nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>US":
            setScreenHeader("Is your business entity established & located in the US or its territories?")
            setCurrentForm(<US nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>ForProfit>No":
        setScreenHeader("Eligibility Warning")
        setCurrentForm(<ForProfitNo nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>ForProfit":
        setScreenHeader("Is your business a for-profit entity?")
        setCurrentForm(<ForProfit nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Ineligible>Yes":
        setScreenHeader("Eligibility Warning")
        setCurrentForm(<IneligibleYes nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Ineligible":
        setScreenHeader("If your business is one the following it is INELIGIBLE…")
        setCurrentForm(<Ineligible nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      // case "Eligibility>Restricted>Yes":
      //   setScreenHeader("Eligibility Warning")
      //   setCurrentForm(<RestrictedYes nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
      //   break;
      // case "Eligibility>Restricted":
      //   setScreenHeader("Does your business generate revenue from any of the following activities?")
      //   setCurrentForm(<Restricted nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
      //   break;
      default:
        setScreenHeader("If your business is one the following it is INELIGIBLE…")
        setCurrentForm(<Ineligible nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
    }
  };

  const [activeTab, setActiveTab] = React.useState("2");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const gotoNextForm = (newForm, screenNavigation) => {
    newForm && setForm(newForm)
    setScreenNavigation(screenNavigation)
  };  

  const gotoSignIn = () => {
    setAuthState("signIn")
    setScreenNavigation(["SignIn"])
  };  

  const gotoEligibility = () => {
    setAuthState("eligibility")
    setScreenNavigation(["Start"])
  };  

  const gotoConfirmSignUp = () => {
    setAuthState("confirmSignUp")
    setScreenNavigation(["Profile>ConfirmSignUp"])
  };  

  //constants & variables

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("twitter-redesign");
    return function cleanup() {
      document.body.classList.remove("twitter-redesign");
    };
  })

  return (
    <>
      <AuthNavBar />
      <AuthHeader />
      <div className="wrapper">
        <Row>
          <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
            <div className="d-flex align-items-center justify-content-center">
            <h4>
                {screenHeader}
            </h4>
            </div>
          </Col>
        </Row>
        <div>              
          {currentForm}
        </div>
      </div>
      <FooterGray/>
    </>
  );
}

export default Opportunity;
