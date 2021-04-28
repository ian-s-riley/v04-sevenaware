/*eslint-disable*/
import React from "react";

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
                    href="https://www.roaringbrook.com"
                    target="_blank"
                    className="mr-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="mr-1"
                  >
                    About Us
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
