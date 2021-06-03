/*eslint-disable*/
import React, { useState, useEffect } from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
  updateForm,
} from 'features/form/formSlice'
import {
  selectNavigation,
  updateNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  Media,
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
import ProfileWelcome from "./borrower-sections/ProfileWelcome";
import ProfileEntity from "./borrower-sections/ProfileEntity";
import ProfileFEIN from "./borrower-sections/ProfileFEIN";
import ProfileSSN from "./borrower-sections/ProfileSSN";
import ProfileJoint from "./borrower-sections/ProfileJoint";

function Application(prop) {
  const dispatch = useDispatch()    
    
  //const [form, setForm] = useState(useSelector(selectForm))   
  const [form, setForm] = useState(prop.form)   
  //console.log('Application.js - form', form)

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [userId, setUserId] = useState(form.userId)
  const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)    
  const [stageHeader, setStageHeader] = useState("")    

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    console.log('Application.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
      case "Profile>JointFirst":
          setStageHeader("Is the principal’s " + (form.ssn !== "") ? "SSN" : "TIN" + " listed as the first or second tax ID number on the tax return?")
          setCurrentForm(<ProfileJoint nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>Joint":
          setStageHeader("Do you file your taxes jointly or individually?")
          setCurrentForm(<ProfileJoint nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>SSN":
          setStageHeader("Please enter your Tax Identification Number:")
          setCurrentForm(<ProfileSSN nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>FEIN":
          setStageHeader("Please enter your " + form.entityType + "’s Federal Employer Identification Number:")
          setCurrentForm(<ProfileFEIN nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
        case "Profile>Entity":
          setStageHeader("Under what type of legal entity does your business operate?")
          setCurrentForm(<ProfileEntity nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>Welcome":
          setStageHeader("Welcome")
          setCurrentForm(<ProfileWelcome nextForm={prop.gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      default:
        setStageHeader("404 Page Not Found")
        setCurrentForm(null)
    }
  };

  const gotoNextForm = (newForm, screenNavigation) => {
    newForm && setForm(newForm)
    setScreenNavigation(screenNavigation)
  };  

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });

  return (
        <div className="profile-content section-white-gray">
          <Container>            
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                <div className="name">
                  <h4>
                    {stageHeader}
                  </h4>
                </div>
              </Col>
            </Row>
            <div className="profile-tabs">
              
            {currentForm}
              
            </div>
          </Container>
        </div>
  );
}

export default Application;
