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
  console.log('Application.js - form', form)

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [userId, setUserId] = useState(form.userId)
  const [screenNavigation, setScreenNavigation] = useState(form.screenNavigation.split(','))    
  const [stageHeader, setStageHeader] = useState("")    

  // useEffect(() => {
  //     fetchForm()
  // }, [])

  // async function fetchForm() {
  //     //get this user's form/application from the DB      
  //     if (userId) {
  //       const formFromAPI = await API.graphql(graphqlOperation(listForms, {
  //         filter: { userId: { eq: userId }},
  //       }))  
  //       const thisForm = formFromAPI.data.listForms.items[0]
  //       console.log('Borrower.js fetchForm: thisForm', thisForm)

  //       //set the redux store
  //       dispatch(updateForm(thisForm))

  //       // //set the local store
  //       setForm(thisForm)

  //       //get the navigation path for this form
  //       const newScreenNavigation = thisForm.screenNavigation.split(',')
  //       const newNav = {
  //         ...navigation,
  //         formId: thisForm.id,
  //         userId: userId,
  //         screenNavigation: newScreenNavigation
  //       }
  //       dispatch(updateNavigation(newNav))
  //       setScreenNavigation(newScreenNavigation)
  //     }
  //   }

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    console.log('Borrower.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
      case "Profile>Joint":
          setStageHeader("Profile")
          setCurrentForm(<ProfileJoint nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>SSN":
          setStageHeader("Profile")
          setCurrentForm(<ProfileSSN nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>FEIN":
          setStageHeader("Profile")
          setCurrentForm(<ProfileFEIN nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
        case "Profile>Entity":
          setStageHeader("Profile")
          setCurrentForm(<ProfileEntity nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
      case "Profile>Welcome":
          setStageHeader("Welcome")
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
                      <i className={"nc-icon nc-minimal-right"} />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342351">
                      Continue your application...
                    </UncontrolledTooltip>
                  </div>
                </div>
              </Col>
            </Row>
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
