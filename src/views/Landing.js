import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container, NavLink, Row, Col } from "reactstrap";

// core components
import AuthNavBar from "components/Navbars/AuthNavBar.js";

function Landing() {

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" +
            require("assets/img/cover-2.jpg").default +
            ")",
        }}
      >

        <AuthNavBar />
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
      </div>
    </>
  );
}

export default Landing;
