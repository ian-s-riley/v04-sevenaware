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


  const  setupChartData = (sectionPrefix, sectionName) => {
    //get the profile navigation steps
    //console.log("setupCharts - screenNavigation", screenNavigation)
    const stepsFiltered = screenNavigation.filter(
      o => o.startsWith(sectionPrefix)
    )    
    if (stepsFiltered.length === 0) {return}

    //reverse the order of the steps, see the latest on top
    const stepsOrdered = stepsFiltered.slice(0).reverse().map(
      function(val, index) {
          return val
      }
    )    

    //percentage completed charts
    //7 steps if SSN/TIN, 6 if FEIN
    //const totalSteps = form.entityType === "Sole Proprietor" ? (8) : (7)
    //for now we'll leave it at 10 steps, it works even if this count isn't right.
    const totalSteps = 10
    //console.log("setupCharts - totalSteps", totalSteps)
    const stepPercent = (1/totalSteps*100)
    //console.log("setupCharts - stepPercent", stepPercent)
    let percentComplete = stepPercent*stepsFiltered.length
    let lastPage = screenNavigation.slice(-1)[0] 
    //console.log("setupChartData - lastPage", lastPage)
    let pieDimension = 400
    //console.log("setupCharts - lastPage", lastPage)    
    if (lastPage.startsWith(sectionPrefix)) {
      //within profile section  
      //lastPage = ""    
    } else {
      //on a next section
      lastPage = ""
      percentComplete = 100
      pieDimension = 360
    }

    let colorScale = "grayscale"
    sectionPrefix === "Profile>" && (colorScale = "cool")
    sectionPrefix === "Ownership>" && (colorScale = "qualitative")

    const chartSection = (
    <Row>
        <Col className="d-flex align-items-center justify-content-center" md="2">
          <svg viewBox="0 0 400 400" >
          <VictoryPie
            standalone={false}
            width={pieDimension} height={pieDimension}
            data={percentComplete < 100 ? (
              [
                {x: "A", y: percentComplete/2},
                {x: "A", y: percentComplete/2},
                {x: "C", y: 100-(percentComplete)},
              ]
            ) : (
              [
              {x: "A", y: 1/6*100},
              {x: "B", y: 1/6*100},
              {x: "B", y: 1/6*100},
              {x: "B", y: 1/6*100},
              {x: "B", y: 1/6*100},
            ]
            )}
            innerRadius={70} labelRadius={100}
            labelComponent={<span/>}
            colorScale={colorScale}
            style={{ labels: { fontSize: 20, fill: "white"}}}
          />
          <VictoryLabel
            textAnchor="middle" verticalAnchor="middle"
            x={pieDimension/2} y={pieDimension/2}
            style={{fontSize: 40}}
            text={percentComplete + "%"}
          />
          </svg>           
          </Col>
          <Col className="" md="6">
                <h4>{sectionName}</h4>
                <h5><small>{percentComplete}% Complete</small></h5>
                {percentComplete < 100 && (
                  <a href="#" onClick={() => gotoForm(lastPage)}>
                    Click here to continue your application
                  </a>
                )}                          
              </Col>
              <Col className="" md="4">
                <div className="hashtag-suggestions pull-left">
                  {percentComplete < 100 && (<h5>Timeline</h5>)}
                  <ul className="list-unstyled">
                    {stepsOrdered.map((screen, key) => {
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
      )

      return chartSection
  }  


  const eligibilitySteps = ["Eligibility>US","Eligibility>ForProfit","Eligibility>Restricted"]
  const EligibilityChart = (
    <Row>
        <Col className="d-flex align-items-center justify-content-center" md="2">
        <svg viewBox="0 0 400 400" >
          <VictoryPie
            standalone={false}
            width={360} height={360}
            data={[
              {x: "A", y: 33},
              {x: "B", y: 33},
              {x: "C", y: 34},
            ]}
            innerRadius={65} labelRadius={100}
            labelComponent={<span/>}
            colorScale={"grayscale"}
            style={{ labels: { fontSize: 201397, fill: "white"}}}
          />
          <VictoryLabel
            textAnchor="middle" verticalAnchor="middle"
            x={180} y={180}
            style={{fontSize: 40}}
            text={"100%"}
          />
          </svg>      
                  


                                     
        </Col>
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
                  {eligibilitySteps.map((screen, key) => {
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
  )

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
    //console.log('gotoForm - screen', screen)
    //console.log('gotoForm - screenNavigation', screenNavigation)
    let newScreenNavigation = form.screenNavigation
    if (screen !== "") {
      newScreenNavigation = screenNavigation.slice(0, screenNavigation.indexOf(screen)+1)
      //console.log('gotoForm - newScreenNavigation', newScreenNavigation)
    } else {
      //go to the most current screen/form      
      //newScreenNavigation = screenNavigation.slice( screenNavigation.indexOf(screen),  screenNavigation.indexOf(screen))
      //console.log('gotoForm - newScreenNavigation', newScreenNavigation)
    }    
    //console.log('gotoForm - newScreenNavigation', newScreenNavigation)

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
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
              <div className="d-flex align-items-center justify-content-center">
                <h4>
                    Welcome
                    <br />
                    <small>{form.userId}</small>
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
                  {setupChartData("Ownership>", "Ownership")}
                  {setupChartData("Profile>", "Business Profile")}
                  {EligibilityChart}
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
