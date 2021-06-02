import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  UncontrolledTooltip,
  NavItem,
} from "reactstrap";

// core components

function AuthNavBar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();

    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("bg-info");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className={classnames("fixed-top", navbarColor)}
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
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
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
    </>
  );
}

export default AuthNavBar;
