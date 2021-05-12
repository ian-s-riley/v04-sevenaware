/*eslint-disable*/
import React, { useState, useEffect } from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
} from 'features/form/formSlice'
import {
  selectNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import AuthNavBar from "components/Navbars/AuthNavBar.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import FooterAuth from "components/Footers/FooterAuth.js";
import Start from "./borrower-sections/Start";
import Restricted from "./borrower-sections/Restricted";
import RestrictedYes from "./borrower-sections/RestrictedYes";
import Ineligible from "./borrower-sections/Ineligible";
import IneligibleYes from "./borrower-sections/IneligibleYes";
import ForProfit from "./borrower-sections/ForProfit";
import ForProfitNo from "./borrower-sections/ForProfitNo";
import US from "./borrower-sections/US";
import USNo from "./borrower-sections/USNo";
import Eligible from "./borrower-sections/Eligible";
import ProfileStart from "./borrower-sections/ProfileStart";
import ProfileSignUp from "./borrower-sections/ProfileSignUp";
import ProfileConfirmSignUp from "./borrower-sections/ProfileConfirmSignUp";

import SignIn from "./SignIn"

function Opportunity() {
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)
  const [form, setForm] = useState(useSelector(selectForm))
  const [stageHeader, setStageHeader] = useState("")
  const [authState, setAuthState] = useState("eligibility") 

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    const screenId = screenNavigation.slice(-1)[0];
    //console.log('Opportunity.js - showForm - screenId', screenId)

    switch (screenId) {
      case "Profile>ConfirmSignUp":
            setStageHeader("Profile")
            setCurrentForm(<ProfileConfirmSignUp nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;  
      case "Profile>SignUp":
            setStageHeader("Profile")
            setCurrentForm(<ProfileSignUp nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
        case "Profile>Start":
            setStageHeader("Profile")
            setCurrentForm(<ProfileStart nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
        case "Eligibility>Eligible":
            setStageHeader("Eligibility Complete")
            setCurrentForm(<Eligible nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>US>No":
            setStageHeader("Eligibility")
            setCurrentForm(<USNo nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>US":
            setStageHeader("Eligibility")
            setCurrentForm(<US nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Eligibility>ForProfit>No":
        setStageHeader("Eligibility")
        setCurrentForm(<ForProfitNo nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>ForProfit":
        setStageHeader("Eligibility")
        setCurrentForm(<ForProfit nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Ineligible>Yes":
        setStageHeader("Eligibility")
        setCurrentForm(<IneligibleYes nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Ineligible":
        setStageHeader("Eligibility")
        setCurrentForm(<Ineligible nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Restricted>Yes":
        setStageHeader("Eligibility")
        setCurrentForm(<RestrictedYes nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Restricted":
        setStageHeader("Eligibility")
        setCurrentForm(<Restricted nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Start":
        setStageHeader("Let's Get Started")
        setCurrentForm(<Start nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "SignIn":
          setStageHeader("Sign Into your Account")
          setCurrentForm(<SignIn />)
          break;
      default:
        setStageHeader("404 Page Not Found")
        setCurrentForm(null)
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
      <div className="wrapper">
        <AuthHeader />
        <div className="profile-content section-white-gray">
          <Container>
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="2" sm="4" xs="6">
                <div className="avatar">
                  <img
                    alt="..."
                    className="img-circle img-responsive"
                    src={require("assets/img/form-1.jpg").default}
                  />
                  <div className="following">
                    <Button
                      className="btn-just-icon"
                      color="info"
                      id="tooltip924342351"
                      size="sm"
                    >
                      <i className="nc-icon nc-simple-add" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342351">
                      "Check your eligibility..."
                    </UncontrolledTooltip>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                <div className="name">
                <h4>
                    Welcome<br />
                    <small>{navigation.userName}</small>
                </h4>
                </div>
              </Col>
            </Row>
            <div className="profile-tabs">
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>                    
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Application
                      </NavLink>
                    </NavItem>                                     
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab}>                
                <TabPane tabId="2" id="application" role="tabpanel">
                  {currentForm}
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      </div>
      <FooterAuth 
        authState={authState}
        signIn={() => gotoSignIn()}
        gotoEligibility={() => gotoEligibility()} 
        gotoConfirmSignUp={() => gotoConfirmSignUp()}
      />
    </>
  );
}

export default Opportunity;
