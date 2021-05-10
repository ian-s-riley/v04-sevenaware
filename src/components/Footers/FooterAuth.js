/*eslint-disable*/
import React from "react";

//amplify authentication
import { Auth }from 'aws-amplify'

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterBorrower(prop) {
    const authState = prop.authState
    console.log('FooterAuth.js - authState', authState)
  return (
    <>
      <footer className="footer footer-white">
        <Container>
          <Row>
          <nav className="footer-nav">
              <ul>              
                {authState === "eligibility" && (
                <li>
                  <a
                    href="#"
                    className="mr-1"
                    onClick={prop.signIn}
                  >
                    Sign In
                  </a>
                </li>
                )}
                {authState === "signIn" && (
                <>
                <li>
                  <a
                    href="#"
                    className="mr-1"
                    onClick={prop.gotoEligibility}
                  >
                    Eligibility
                  </a>
                </li>
                </>
                )}
                {authState === "signUp" && (
                <li>
                  <a
                    href="#"
                    className="mr-1"
                    onClick={prop.confirmSignUp}
                  >
                    Confirm Sign Up
                  </a>
                </li>
                )}
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                {" "}7(a)ware
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterBorrower;
