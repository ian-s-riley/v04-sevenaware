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
import ProfileID from "./borrower-sections/ProfileID";
import ProfileJointTaxes from "./borrower-sections/ProfileJointTaxes";
import ProfileDBA from "./borrower-sections/ProfileDBA";
import ProfileBusinessName from "./borrower-sections/ProfileBusinessName";

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
    //console.log('Application.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
      case "Profile>BusinessName":
          setStageHeader("What is your business entity’s legal name?")
          setCurrentForm(<ProfileBusinessName nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>DBA":
        setStageHeader("Do you use a Doing Business As (“DBA”) name for your business?")
            setCurrentForm(<ProfileDBA nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
            break;
      case "Profile>JointTaxes":
          setStageHeader("Do you file your taxes jointly or individually?")
          setCurrentForm(<ProfileJointTaxes nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>ID":
          setStageHeader("Please enter your Tax Identification Number:")
          setCurrentForm(<ProfileID nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
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
          setStageHeader("Welcome to 7(a)ware")
          setCurrentForm(<ProfileWelcome nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
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
