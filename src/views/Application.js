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
import ProfileWelcome from "./borrower-sections/Profile";
import ProfileEntity from "./borrower-sections/ProfileEntity";
import ProfileFEIN from "./borrower-sections/ProfileFEIN";
import ProfileID from "./borrower-sections/ProfileID";
import ProfileJointTaxes from "./borrower-sections/ProfileJointTaxes";
import ProfileDBA from "./borrower-sections/ProfileDBA";
import ProfileBusinessName from "./borrower-sections/ProfileBusinessName";
import ProfileBusinessAddress from "./borrower-sections/ProfileBusinessAddress";
import ProfileNACIS from "./borrower-sections/ProfileNACIS";
import Ownership from "./ownership-sections/Ownership"
import Owners from "./ownership-sections/Owners"

function Application(prop) {
  const dispatch = useDispatch()    
    
  //const [form, setForm] = useState(useSelector(selectForm))   
  const [form, setForm] = useState(prop.form)   
  console.log('Application.js - form', form)

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
      case "Ownership>Owners":
        setStageHeader("[We need 100% ownership structure]")
        setCurrentForm(<Owners nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Ownership>":
          setStageHeader(form.entityType === "Sole Proprietor " ? (
            "Let's get the ownership structure of your business for the SBA."
          ) : (
            form.businessName !== "" ? (
                "We need to gather the complete ownership information on " + form.businessName
              ) : (
                "We need to gather the complete ownership information on " + form.dba
              )            
          ))
          setCurrentForm(<Ownership nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>NACIS":
          setStageHeader("Please select this " + form.entityType + "’s Industry Classification Code.")
          setCurrentForm(<ProfileNACIS nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>BusinessAddress":
          setStageHeader("What is your business entity’s address?")
          setCurrentForm(<ProfileBusinessAddress nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
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
      case "Profile>":
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
        <div className="">
          <Container>            
            <Row className="">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                <div className="name">
                  <h4>
                    {stageHeader}
                  </h4>
                </div>
              </Col>
            </Row>
            <div className="profile-content">
              
            {currentForm}
              
            </div>
          </Container>
        </div>
  );
}

export default Application;
