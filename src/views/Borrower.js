/*eslint-disable*/
import React, { useState, useEffect } from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, listNotifications } from '../graphql/queries';

//AWS Amplify Auth libraries
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

//google charts
import Chart from "react-google-charts";
import Chartist from "react-chartist";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateForm,
  createFormAsync,
  updateFormAsync,
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

function Borrower() {
  const dispatch = useDispatch()

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [userId, setUserId] = useState(navigation.userId)
  const [userName, setUserName] = useState(navigation.userName)
  const [formId, setFormId] = useState(navigation.formId)

  const [form, setForm] = useState(useSelector(selectForm))
  const [notifications, setNotifications] = useState([])

  const [screenNavigation, setScreenNavigation] = useState([])
  const [stageHeader, setStageHeader] = useState("")

  console.log('Borrower.js : screenNavigation', screenNavigation)

  useEffect(() => {
    fetchForm()
  }, [formId])

  useEffect(() => {
    fetchNotifications()
  }, [userId])

  async function fetchForm() {
    //get this user's form/application from the DB
    if (formId) {
      const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId } });
      const thisForm = formFromAPI.data.getForm
      //console.log('Borrower.js fetchForm: thisForm', thisForm)

      // //set the redux store
      dispatch(updateForm(thisForm))

      // //set the local store
      setForm(thisForm)

      //get the navigation path for this form
      const newScreenNavigation = thisForm.screenNavigation.split(',')
      const newNav = {
        ...navigation,
        screenNavigation: newScreenNavigation
      }
      dispatch(updateNavigation(newNav))
      setScreenNavigation(newScreenNavigation)
      // newScreenNavigation.map(screen => {
      //   console.log('screen', screen)
      // })
    } else {
      // //create a new form for this user      
      // const newForm = {
      //   ...form, 
      //   userId: userId,
      //   screenNavigation: ["Start"]       
      // }
      // //console.log('fetchForm: newForm', newForm) 
      // dispatch(createFormAsync(newForm))
    }
  }

  async function fetchNotifications() {
    const apiData = await API.graphql(graphqlOperation(listNotifications, {
      filter: { toUserId: { eq: userId } },
    }))

    const notificationsFromAPI = apiData.data.listNotifications.items
    //console.log('fetchNotifications: notificationsFromAPI', notificationsFromAPI)
    setNotifications(notificationsFromAPI)
  }

  const [currentForm, setCurrentForm] = useState()
  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    //console.log('Borrower.js - showForm - screenNavigation', screenNavigation)
    const screenId = screenNavigation.slice(-1)[0];

    switch (screenId) {
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

  const showReply = false

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("twitter-redesign");
    return function cleanup() {
      document.body.classList.remove("twitter-redesign");
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
                      Hello<br />
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
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Notifications
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
                        Documents
                      </NavLink>
                    </NavItem>
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
                                <Media heading tag="strong">
                                  {notification.fromUserId}
                                </Media>
                                <div className="pull-right">
                                  <h6 className="text-muted">{notification.createdAt}</h6>
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
                            <ul className="list-unstyled">
                              <li className="account">
                                <Row>

                                  {true && (
                                    <Col md="5">
                                      <div className="avatar">

                                        <Chartist
                                          data={{
                                            labels: [form.percentComplete + " %", " "],
                                            series: [form.percentComplete, 100 - form.percentComplete],
                                          }}
                                          type="Pie"
                                          options={{
                                            height: "220px",
                                            donut: true,
                                            donutWidth: 50,
                                            donutSolid: true,
                                            startAngle: 270,
                                            showLabel: true
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  )}
                                </Row>
                              </li>
                            </ul>
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
                                <li>
                                  {screenNavigation[0]}
                                </li>
                              {screenNavigation.map((screen, key) => {
                                <li key={key}>
                                  {screen}
                                </li>
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
