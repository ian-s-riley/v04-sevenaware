/*eslint-disable*/
import React, { useState, useEffect } from "react";
//amplify authentication
import { Auth } from 'aws-amplify'

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listNotifications, listForms } from '../graphql/queries';

//chartist chart control
//import Chartist from "react-chartist";
import {VictoryPie, VictoryTheme, VictoryLabel} from 'victory';

//parser for html in text
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
import Documents from "./borrower-sections/Documents";

function Dashboard(prop) {
  const dispatch = useDispatch()    
    
  const [form, setForm] = useState(prop.form)
  const [notifications, setNotifications] = useState([])    

  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const [userId, setUserId] = useState(navigation.userId)
  const [screenNavigation, setScreenNavigation] = useState(prop.form.screenNavigation.split(","))    
  
  const [showReply, setShowReply] = useState(false)
    
  useEffect(() => {
    fetchNotifications()
  }, [userId])  

  async function fetchNotifications() {
    if (userId) {
      const apiData = await API.graphql(graphqlOperation(listNotifications, {
        filter: { toUserId: { eq: userId } },
      }))
  
      const notificationsFromAPI = apiData.data.listNotifications.items
      //console.log("fetchNotifications - count", notificationsFromAPI.length)
      //console.log('fetchNotifications: notificationsFromAPI', notificationsFromAPI)
      setNotifications(notificationsFromAPI)
    }
  } 
  
  function gotoForm(screen) {
    let newScreenNavigation = form.screenNavigation
    if (screen) {
      newScreenNavigation = screenNavigation.slice(0, screenNavigation.indexOf(screen)+1)
    }
    
    console.log('gotoForm - newScreenNavigation', newScreenNavigation)

    const newNav = {
      ...navigation,
      screenNavigation: newScreenNavigation
    }
    dispatch(updateNavigation(newNav))
    prop.showForm()
  }

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const progressChart = (
    <svg viewBox="0 0 400 400" >
      <VictoryPie
        standalone={false}
        width={400} height={400}
        data={[
          {x: "A", y: form.percentComplete},
          {x: "B", y: 100-form.percentComplete}
        ]}
        innerRadius={70} labelRadius={100}
        labelComponent={<span/>}
        colorScale={"cool"}
        style={{ labels: { fontSize: 20, fill: "white"}}}
      />
      <VictoryLabel
        textAnchor="middle" verticalAnchor="middle"
        x={200} y={200}
        style={{fontSize: 30}}
        text={form.percentComplete + "%"}
      />
      </svg>
  )

const stepsEligibility = (["Eligibility>Restricted","Eligibility>Ineligible","Eligibility>ForProfit","Eligibility>US","Eligibility>Eligible"])
const progressChartEligibility = (
  <svg viewBox="0 0 400 400" >
  <VictoryPie
    standalone={false}
    width={400} height={400}
    data={[
      {x: "A", y: 100}
    ]}
    innerRadius={70} labelRadius={100}
    labelComponent={<span/>}
    colorScale={"grayscale"}
    style={{ labels: { fontSize: 20, fill: "white"}}}
  />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={200} y={200}
    style={{fontSize: 30}}
    text="100%"
  />
  </svg>
)


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
                      onClick={gotoForm}
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
                    <h5>
                      Welcome<br /><small>{userId}</small>
                    </h5>
                  </div>
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
                        Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Notifications
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
                <TabPane tabId="1" id="home">
                  <Row>
                    <Col className="" md="2">
                    {progressChart}
                    </Col>
                    <Col className="" md="6">
                          <h4>Business Profile & Ownership</h4>
                          <h5><small>{form.percentComplete}% Complete</small></h5>
                          <a href="#" onClick={gotoForm}>
                            Click here to continue your application
                          </a>
                        </Col>
                        <Col className="" md="4">
                          <div className="hashtag-suggestions pull-left">
                            <h5>Timeline</h5>
                            <ul className="list-unstyled">
                              {screenNavigation.map((screen, key) => {
                                return (
                                <li key={key}>
                                <a
                                  href="#"
                                  onClick={() => gotoForm(screen)}
                                >
                                  {screen}
                                </a>
                                </li>
                                )
                              })
                              }
                            </ul>
                          </div>
                        </Col>
                  </Row>
                  <Row>
                    <Col className="" md="2">{progressChartEligibility}</Col>
                    <Col className="" md="6" tag="h5">
                          <br />
                          Eligibility
                          <br/>
                          <small>100% Complete</small>
                        </Col>
                        <Col className="" md="4">
                          <div className="hashtag-suggestions pull-left">
                            <br />
                            <ul className="list-unstyled">
                              {stepsEligibility.map((screen, key) => {
                                return (
                                <li key={key}>
                                  {screen}
                                </li>
                                )
                              })
                              }
                            </ul>
                          </div>
                        </Col>
                  </Row>

                </TabPane>
                <TabPane tabId="2" id="application" role="tabpanel">
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
                            <>
                            {parse(notification.body)}
                            </>
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
                </Row>
                </TabPane>
                <TabPane tabId="3" id="documents" role="tabpanel">
                  <Documents />
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
    </>
  )
}

export default Dashboard;
