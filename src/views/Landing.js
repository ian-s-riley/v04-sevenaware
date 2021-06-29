import React from "react";
import { Link } from "react-router-dom";

// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Button, 
  Container, 
  NavLink, 
  Row, 
  Col, 
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
} from "reactstrap";


function Landing() {

  return (
    <>
      <div
        className="page-header"
      >

      <Navbar
        className={classnames("fixed-top", "navbar-transparent")}
        id="navbar-main"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand id="navbar-brand" to="/" tag={Link}>
              <img
                  alt="Home"               
                  style={{
                    height: "20px"
                  }}
                  src={require("assets/img/7alogo.png").default}
                />
            </NavbarBrand>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
              }}
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <Collapse navbar isOpen={true}>
            <Nav className="ml-auto" navbar>                            
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="mr-2" nav>
                  <i className="fa fa-3x fa-bars"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-primary" right>
                  <DropdownItem to="/signin" tag={Link}>
                    Sign In
                  </DropdownItem>
                  <hr/>
                  <DropdownItem tag={Link} to="/opportunity">
                    Sign Up
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/verify">
                    Verify Sign Up
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>        
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
        <div className="content-center">
          <Container>
            <div className="motto">
              <h1 className="title">Welcome to 7(a)ware</h1>
              <h3 className="description">
                A portal for easily applying for a 7(a) loan from the SBA.
              </h3>
              <h5>
              Let's determine if you are eligible by answering a few questions.
              </h5>
              <br />
              <Row>
                <Col md="6">
                <NavLink to="/opportunity" tag={Link}>
                  <Button
                    className="btn-round pull-right"
                    color="neutral"
                    type="button"
                    outline
                  >
                    Get Started
                  </Button>
                </NavLink> 
                </Col>
                <Col md="6">
                  <NavLink to="/signin" tag={Link}>
                    <Button
                      className="btn-round pull-left"
                      color="neutral"
                      type="button"
                      outline
                    >
                      Sign In
                    </Button>
                  </NavLink>
                </Col>
              </Row>                               
            </div>
          </Container>
        </div>
        <div className="page-header header-video">
              <div className="" />
              {/*
              <div
                className="video-image"
                style={{
                  backgroundImage:
                    "url(" +
                    require("assets/img/cover-2.jpg").default +
                    ")",
                }}
              />
              */}
              <div className="filter filter-primary" />
              <div
                className="video-image"
                style={{
                  backgroundImage:
                    "url(" +
                    require("assets/img/video-placeholder.png").default +
                    ")",
                }}
              />
              <video
                id="video-source"
                loop="loop"
                muted="muted"
                preload="auto"
                volume="0" 
                autoPlay={true}
              >
              <source
                  src={"https://sevenaware-v04.s3.amazonaws.com/business.webm"}
                  type="video/webm"
                ></source>
                <source
                  src={"https://sevenaware-v04.s3.amazonaws.com/business.mp4"}
                  type="video/mp4"
                ></source>
                Video not supported
              </video>          
                
            </div>
      </div>
      
    </>
  );
}

export default Landing;
