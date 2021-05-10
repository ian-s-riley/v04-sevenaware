/*eslint-disable*/
import React from "react";

//amplify authentication
import { Auth }from 'aws-amplify'

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterBorrower() {
  return (
    <>
      <footer className="footer footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={() => Auth.signOut()}
                    className="mr-1"
                  >
                    Sign Out
                  </a>
                </li>
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
