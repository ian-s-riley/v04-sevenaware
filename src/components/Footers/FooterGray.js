/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterGray() {
  return (
    <>
      <footer className="footer footer-gray footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a
                    href="#" onClick={(e) => e.preventDefault()}
                    target="_blank"
                    className="mr-1"
                  >
                    Roaring Brook Ventures
                  </a>
                </li>
                <li>
                  <a
                    href="#" onClick={(e) => e.preventDefault()}
                    target="_blank"
                  >
                    About 7(a)ware
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                {" "}7(a)ware, LLC
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterGray;
