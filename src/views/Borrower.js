/*eslint-disable*/
import React, { useState, useEffect } from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, listNotifications } from '../graphql/queries';
import { createUser as createUserMutation, createForm as createFormMutation } from '../graphql/mutations';

//AWS Amplify Auth libraries
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

//google charts
//import Chart from "react-google-charts";
//chartist chart control
import Chartist from "react-chartist";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
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
import BorrowerNavBar from "components/Navbars/BorrowerNavBar.js";
import BorrowerHeader from "components/Headers/BorrowerHeader.js";
import FooterBorrower from "components/Footers/FooterBorrower.js";
import Documents from "./borrower-sections/Documents";
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

function Borrower() {
  const dispatch = useDispatch()

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const userId = navigation.userId
  const formId = navigation.formId
  const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)
  const [stageHeader, setStageHeader] = useState("")    
  const [form, setForm] = useState(useSelector(selectForm))
  const [notifications, setNotifications] = useState([])

//   useEffect(() => {
//     fetchForm()
// }, [formId])

// async function fetchForm() {
//     //get this user's form/application from the DB
//     if (formId) {
//       const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId } });
//       const thisForm = formFromAPI.data.getForm
//       //console.log('Borrower.js fetchForm: thisForm', thisForm)

//       // //set the redux store
//       dispatch(updateForm(thisForm))

//       // //set the local store
//       setForm(thisForm)

//       //get the navigation path for this form
//       const newScreenNavigation = thisForm.screenNavigation.split(',')
//       const newNav = {
//         ...navigation,
//         screenNavigation: newScreenNavigation
//       }
//       dispatch(updateNavigation(newNav))
//       setScreenNavigation(newScreenNavigation)
//       // newScreenNavigation.map(screen => {
//       //   console.log('screen', screen)
//       // })
//     }}
//   }
    
  useEffect(() => {
    fetchNotifications()
  }, [userId])  

  async function fetchNotifications() {
    if (userId) {
      const apiData = await API.graphql(graphqlOperation(listNotifications, {
        filter: { toUserId: { eq: userId } },
      }))
  
      const notificationsFromAPI = apiData.data.listNotifications.items
      //console.log('fetchNotifications: notificationsFromAPI', notificationsFromAPI)
      setNotifications(notificationsFromAPI)
    }
  }

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    console.log('Borrower.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
      case "Profile>Start":
        setStageHeader("Profile")
        setCurrentForm(<ProfileStart nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Eligibility>Eligible":
        setStageHeader("Eligibility Complete")
        setCurrentForm(<Eligible nextForm={gotoNextForm} newUserAndForm={newUserAndForm} navigation={screenNavigation} form={form} />)
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
      default:
        setStageHeader("404 Page Not Found")
        setCurrentForm(null)
    }
  };

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const gotoNextForm = (newForm, screenNavigation) => {
    newForm && setForm(newForm)
    setScreenNavigation(screenNavigation)
  };

  async function newUserAndForm() {
    //create the new user
    const apiUserData = await API.graphql(
      { query: createUserMutation, 
        variables: { input: {userType: "Borrower"} } 
      }
    )
    const newUser = apiUserData.data.createUser
    //console.log('newUserAndForm - newUserId', newUser.id)

    //create the new form for this user
    const apiFormData = await API.graphql(
      { query: createFormMutation, 
        variables: { input: form } 
      }
    )
    const newForm = apiFormData.data.createForm
    console.log('newUserAndForm - newFormId', newForm.id)

    //update the navigation/site store
    console.log('newUserAndForm - newFormId')
  };

  //constants & variables
  const showReply = false
  const data={
    labels: [form.percentComplete + " %", " "],
    series: [form.percentComplete, 100 - form.percentComplete],
  }
  const options = {
    width: "150px",
    donut: true,
    donutWidth: 50,
    donutSolid: true,
    startAngle: 270,
    showLabel: true,
  }
  const type = "Pie";

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("twitter-redesign");
    return function cleanup() {
      document.body.classList.remove("twitter-redesign");
    };
  });
  return (
    <>
      <BorrowerNavBar navigation={navigation} />
      <div className="wrapper">
        <BorrowerHeader />
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
                      onClick={() => {
                        setScreenNavigation(["Start"])
                        toggle("2");
                      }}
                      color="info"
                      id="tooltip924342351"
                      size="sm"
                    >
                      <i className={formId ? "nc-icon nc-minimal-right" : "nc-icon nc-simple-add"} />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342351">
                      {formId ? "Continue your application..." : "Start your application..."}
                    </UncontrolledTooltip>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                {activeTab === "2" ? (
                  <div className="name">
                    <h4>
                      {stageHeader}
                    </h4>
                  </div>
                ) : (
                  <div className="name">
                    <h4>
                      Welcome<br />
                      <small>{navigation.userName}</small>
                    </h4>
                  </div>
                )}
              </Col>
            </Row>
            <div className="profile-tabs">
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>
                    {userId && (
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Home
                      </NavLink>
                    </NavItem>
                    )}
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
                    {userId && (
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Library
                      </NavLink>
                    </NavItem>
                    )}                    
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" id="tweets">
                  <Row>
                    <Col md="2"></Col>
                    <Col md="6">
                      <div className="tweets">

                        {notifications.map((notification, key) => {
                          //const timelineBadgeClasses = classes.timelineBadge + " " + classes[notification.badgeColor] + " " + classes.timelineSimpleBadge
                          let image = "assets/img/person-2.jpg"
                          if (notification.badgeIcon) { image = notification.badgeIcon }
                          return (

                            <Media key={key}>
                              <a
                                className="pull-left"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="avatar">
                                  <Media
                                    alt="..."
                                    object
                                    src={
                                      require("assets/img/person-2.jpg")
                                        .default
                                    }
                                  />
                                </div>
                              </a>
                              <Media body>
                                <Media heading tag="author">
                                  {notification.fromUserId}
                                </Media>
                                <div className="pull-right">
                                  <h6 className="text-muted">{new Date(notification.createdAt).toLocaleDateString("en-US")}</h6>
                                  <Button
                                    className="btn-link pull-right"
                                    color="info"
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fa fa-reply mr-1" />
                              Reply
                            </Button>
                                </div>
                                <p>
                                  {notification.body}
                                </p>
                                {showReply && (
                                  <Media className="media-post">
                                    <a
                                      className="pull-left author"
                                      href="#"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <div className="avatar">
                                        <Media
                                          alt="..."
                                          object
                                          src={
                                            require("assets/img/faces/kaci-baum-2.jpg")
                                              .default
                                          }
                                        />
                                      </div>
                                    </a>
                                    <Media body>
                                      <Input
                                        placeholder="Write a nice reply or go home..."
                                        rows="4"
                                        type="textarea"
                                      />
                                      <div className="media-footer">
                                        <Button
                                          className="pull-right"
                                          color="info"
                                          href="#"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          Reply
                                  </Button>
                                      </div>
                                    </Media>
                                  </Media>
                                )}
                              </Media>
                            </Media>


                          );
                        })}

                        {false && (
                          <>
                            <br />
                            <div className="text-center">
                              <Button className="btn-round" color="info" outline>
                                Show more notifications
                          </Button>
                            </div>
                          </>
                        )}

                      </div>
                    </Col>
                    <Col md="4" sm="6">
                      <Card className="card-with-shadow">
                        <CardBody>
                          <CardTitle tag="h5">
                            {form.percentComplete}% Complete
                          </CardTitle>
                          <div className="accounts-suggestion">
                            <Chartist data={data} options={options} type={type} />
                          </div>
                        </CardBody>
                      </Card>
                      {/* end card */}
                      <Card className="card-with-shadow">
                        <CardBody>
                          <CardTitle tag="h5">
                            Timeline
                          </CardTitle>
                          <div className="hashtag-suggestions">
                            <ul className="list-unstyled">
                              {screenNavigation.map((screen, key) => {
                                return (
                                <li key={key}>
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {screen}
                                </a>
                                </li>
                                )
                              })
                              }
                            </ul>
                          </div>
                        </CardBody>
                      </Card>
                      {/* end card */}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2" id="application" role="tabpanel">
                  {currentForm}
                </TabPane>
                <TabPane tabId="3" id="documents" role="tabpanel">
                  <Documents />
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      </div>
      <FooterBorrower />
    </>
  );
}

export default withAuthenticator(Borrower);
