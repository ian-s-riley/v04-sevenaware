/*eslint-disable*/
import React, { useState, useEffect } from "react";
//amplify authentication
import { Auth, Hub } from 'aws-amplify'

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listNotifications, listForms } from '../graphql/queries';

//google charts
//import Chart from "react-google-charts";
//chartist chart control
import Chartist from "react-chartist";

import parse from 'html-react-parser';

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
  ButtonToggle,
} from "reactstrap";

// core components
import BorrowerNavBar from "components/Navbars/BorrowerNavBar.js";
import BorrowerHeader from "components/Headers/BorrowerHeader.js";
import FooterBorrower from "components/Footers/FooterBorrower.js";
import Documents from "./borrower-sections/Documents";
import ProfileWelcome from "./borrower-sections/ProfileWelcome";
import ProfileName from "./borrower-sections/ProfileName";
import ProfileID from "./borrower-sections/ProfileID";
import ProfileAddress from "./borrower-sections/ProfileAddress";

function Borrower(prop) {
  const dispatch = useDispatch()    
    
  const [form, setForm] = useState(useSelector(selectForm))
  const [notifications, setNotifications] = useState([])    

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [userId, setUserId] = useState(navigation.userId)
  const [screenNavigation, setScreenNavigation] = useState(["Profile>Welcome"])    
  const [stageHeader, setStageHeader] = useState("")    
  
  const [showReply, setShowReply] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
        const thisUser = await Auth.currentAuthenticatedUser()        
        setUserId(thisUser.username)
        //console.log('checkuser - user signed in - thisUser:', thisUser.username)
      } catch (error) {
          console.log('checkUser - error signing in:', error)
      }               
  }

  useEffect(() => {
      fetchForm()
  }, [userId])

  async function fetchForm() {
      //get this user's form/application from the DB      
      if (userId) {
        //const formFromAPI = await API.graphql({ query: listForms, filter: {userId: {eq: "e9148263-3344-4a09-8572-54829968eeaa"}} });
        const formFromAPI = await API.graphql(graphqlOperation(listForms, {
          filter: { userId: { eq: userId }},
        }))  
        const thisForm = formFromAPI.data.listForms.items[0]
        //console.log('Borrower.js fetchForm: thisForm', thisForm)

        //set the redux store
        dispatch(updateForm(thisForm))

        // //set the local store
        setForm(thisForm)

        //get the navigation path for this form
        const newScreenNavigation = thisForm.screenNavigation.split(',')
        const newNav = {
          ...navigation,
          formId: thisForm.id,
          userId: userId,
          screenNavigation: newScreenNavigation
        }
        dispatch(updateNavigation(newNav))
        setScreenNavigation(newScreenNavigation)
      }
    }
    
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
    //console.log('Borrower.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
      case "Profile>Address":
        setStageHeader("Profile")
        setCurrentForm(<ProfileAddress nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
        break;
      case "Profile>ID":
          setStageHeader("Profile")
          setCurrentForm(<ProfileID nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
          break;
        case "Profile>Name":
          setStageHeader("Profile")
          setCurrentForm(<ProfileName nextForm={gotoNextForm} navigation={screenNavigation} form={form} />)
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

  

  //constants & variables  
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
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });

  return (
    <>
      <BorrowerNavBar />
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
                      <small>{userId}</small>
                    </h4>
                  </div>
                )}
              </Col>
            </Row>
            <div className="profile-tabs">
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>
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
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" id="home">
                  <Row>
                  <Col className="ml-auto mr-auto" md="8">
                    <div className="media-area">

                        {notifications.map((notification, key) => {
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
                                      require("assets/img/placeholder-2.jpg")
                                        .default
                                    }
                                  />
                                </div>
                              </a>
                              <Media body>
                                <Media heading tag="h6">
                                  {notification.fromUserId}
                                </Media>
                                <div className="pull-right">
                                  <h6 className="text-muted">{new Date(notification.createdAt).toLocaleDateString("en-US")}</h6>
                                  <Button
                                    className="btn-link pull-right"
                                    color="info"
                                    href="#"
                                    onClick={() => setShowReply(!showReply)}
                                  >
                                    <i className="fa fa-reply mr-1" />
                                    Reply
                                  </Button>
                                </div>
                                <p>
                                  {parse(notification.body)}
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
                                            require("assets/img/placeholder-2.jpg")
                                              .default
                                          }
                                        />
                                      </div>
                                    </a>
                                    <Media body>
                                      <Input
                                        placeholder="What's up?"
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
                          <Chartist
                            style={{                              
                              stroke: "white",
                            }}
                            data={{
                              labels: [form.percentComplete + " %", " "],
                              series: [form.percentComplete, 100-form.percentComplete],
                            }}
                            type="Pie"
                            options={{
                              height: "220px",
                              donut: true,
                              donutWidth: 70,
                              donutSolid: true,
                              startAngle: 270,
                              showLabel: true
                            }}
                          />
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

export default Borrower;
