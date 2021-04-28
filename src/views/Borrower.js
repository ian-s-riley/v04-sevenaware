/*eslint-disable*/
import React, {useState} from "react";

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

function Borrower() {
  const [activeTab, setActiveTab] = React.useState("1");
  const showReply = false

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
                      color="info"
                      id="tooltip924342351"
                      size="sm"
                    >
                      <i className="nc-icon nc-simple-add" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342351">
                      Continue your application...
                    </UncontrolledTooltip>
                  </div>
                </div>
                <div className="name">
                  <h4>
                    Hello<br />
                    <small>borrower name</small>
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
                        Current Application
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Documents & Files
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" id="tweets">
                  <Row>
                    <Col md="8">
                      <div className="tweets">
                      <Media>
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
                            Jenny Jones
                          </Media>
                          <div className="pull-right">
                            <h6 className="text-muted">Sep 11, 11:53 AM</h6>
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
                            Hello guys, nice to have you on the platform! There will
                            be a lot of great stuff coming soon. We will keep you
                            posted for the latest news.
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
                      {/* end media */}
                      {/* Comment */}
                      <Media>
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
                                require("assets/img/person-1.jpg")
                                  .default
                              }
                            />
                          </div>
                        </a>
                        <Media body>
                          <Media heading tag="strong">
                            Flume
                          </Media>
                          <div className="pull-right">
                            <h6 className="text-muted">Sep 11, 11:54 AM</h6>
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
                            Hello guys, nice to have you on the platform! There will
                            be a lot of great stuff coming soon. We will keep you
                            posted for the latest news.
                          </p>                          
                          <Media>
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
                                    require("assets/img/faces/kaci-baum-2.jpg")
                                      .default
                                  }
                                />
                              </div>
                            </a>
                            <Media body>
                              <Media heading tag="strong">
                                Eric Faker
                              </Media>
                              <div className="pull-right">
                                <h6 className="text-muted">Sep 11, 11:56 AM</h6>
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
                                Hello guys, nice to have you on the platform! There
                                will be a lot of great stuff coming soon. We will keep
                                you posted for the latest news.
                              </p>
                              <p>Don't forget, You're Awesome!</p>                              
                            </Media>
                          </Media>
                          {/* end media */}
                        </Media>
                      </Media>
                      {/* end media */}
                        <br />
                        <div className="text-center">
                          <Button className="btn-round" color="info" outline>
                            Show more notifications
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" sm="6">
                      <Card className="card-with-shadow">
                        <CardBody>
                          <CardTitle tag="h5">
                            Current Application
                          </CardTitle>
                          <div className="accounts-suggestion">
                            <ul className="list-unstyled">
                              <li className="account">
                                <Row>
                                  <Col md="5">
                                    <div className="avatar">
                                      <img
                                        alt="..."
                                        className="img-circle img-no-padding img-responsive"
                                        src={
                                          require("assets/img/percentage.jpg")
                                            .default
                                        }
                                      />
                                    </div>
                                  </Col>
                                  <Col className="description-section" md="7">
                                    <span>
                                      25% Done
                                    </span>
                                    <br />
                                    <span className="text-muted">
                                      <small>
                                        Next Step{" "}
                                        <a
                                          className="link-info"
                                          href="#"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          @banks
                                        </a>
                                      </small>
                                    </span>
                                  </Col>
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
                            Timeline ·{" "}
                            <small>
                              <a
                                className="link-info"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Details
                              </a>
                            </small>
                          </CardTitle>
                          <div className="hashtag-suggestions">
                            <ul className="list-unstyled">
                              <li>
                                <i className="fa fa-calendar mr-1" />
                                Application Started May 2021
                              </li>
                              <li>
                                <a
                                  className="link-danger"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Owners Contacted
                                </a>
                              </li>
                              <li>
                                <a
                                  className="link-danger"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Application Started
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Welcome to 7(a)ware
                                </a>
                              </li>
                            </ul>
                          </div>
                        </CardBody>
                      </Card>
                      {/* end card */}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2" id="connections" role="tabpanel" />
                <TabPane tabId="3" id="media" role="tabpanel">
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
