import React, { useState, useEffect } from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

// reactstrap components
import {
  FormGroup,
  Form,
  Label,
  Button,
  Card,
  CardTitle,
  Input,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import AuthNavBar from "components/Navbars/AuthNavBar";
import AuthHeader from "components/Headers/AuthHeader";
import FooterAuth from "components/Footers/FooterAuth";

function CustomAuth() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("twitter-redesign");
    return function cleanup() {
      document.body.classList.remove("twitter-redesign");
    };
  })

  /* Create the form state and form input state */
  const [authState, setAuthState] = useState("signUp") 
  console.log('customauth.js - authState', authState)
  const [formInputState, setFormInputState] = useState({ username: '', password: '', email: '', verificationCode: '' })

  /* onChange handler for form inputs */
  function onChange(e) {
    setFormInputState({ ...formInputState, [e.target.name]: e.target.value })
  }

  /* Sign up function */
  async function signUp() {
    try {
      await Auth.signUp({
        username: formInputState.email,
        password: formInputState.password,
        attributes: {
          email: formInputState.email
        }});
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setAuthState("confirmSignUp")
    } catch (err) { console.log({ err }); }
  }

  /* Confirm sign up function for MFA */
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(formInputState.email, formInputState.verificationCode);
      /* Once the user successfully confirms their account, update form state to show the sign in form*/
      setAuthState("signIn");
    } catch (err) { console.log({ err }); }
  }

  /* Sign in function */
  async function signIn() {
    try {
      await Auth.signIn(formInputState.email, formInputState.password);
      /* Once the user successfully signs in, update the form state to show the signed in state */
      //setAuthState("signedIn");
      //go to the borrower page

    } catch (err) { console.log({ err }); }
  }

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const signUpForm = (
    <div className="profile-content section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
              <FormGroup>
                <Label for="email" className="control-label">Email Address</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChange}
                />
              </FormGroup>
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="ml-auto mr-auto" md="6">
                  <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input
                      type="text"
                      name="password2"
                      id="examplePassword"
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </FormGroup>

                </Col>
              </Row>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
  I understand how 7(a)ware will <a>use and protect my data</a>. And I agree to the <a>terms & conditions</a>.
  <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
              </FormGroup>
              <div className="text-center">
                <Button
                    className="pull-right"
                    onClick={signUp}
                    color="info"
                    size="sm"
                >
                    Sign Up
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )

  const confirmSignUpForm = (
    <div className="profile-content section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
              <FormGroup>
                <Label for="email" className="control-label">Email Address</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChange}
                  defaultValue={formInputState.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Verification Code</Label>
                <Input
                  name="verificationCode"
                  id="verificationCode"
                  placeholder="Verification Code"
                  onChange={onChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button
                    onClick={() => setAuthState("signIn")}
                    className="pull-left"
                    size="sm"
                >
                    Sign In
                </Button>
                <Button
                    className="pull-right"
                    onClick={confirmSignUp}
                    color="info"
                    size="sm"
                >
                    Confirm Sign Up
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )

  const signInForm = (
    <div className="profile-content section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
              <FormGroup>
                <Label for="email" className="control-label">Email Address</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button
                    className="pull-right"
                    onClick={signIn}
                    color="info"
                    size="sm"
                >
                    Sign In
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )

  const signedInForm = (
    <div>
      <h1>You've been signed in. Refresh for the borrower screen.</h1>
    </div>
  )

  return (
    <>
      <AuthNavBar />
      <div className="wrapper">
        <AuthHeader />
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
                      Tooltip
                    </UncontrolledTooltip>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                <div className="name">
                <h4>
                    Welcome
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
                        Eligibility
                      </NavLink>
                    </NavItem>                                  
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab}>                
                <TabPane tabId="1" id="application" role="tabpanel">
                  {authState === "signUp" && signUpForm}
                  {authState === "confirmSignUp" && confirmSignUpForm}
                  {authState === "signIn" && signInForm}
                  {authState === "signedIn" && signedInForm}
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      </div>
      <FooterAuth 
        authState={authState} 
        signIn={() => setAuthState("signIn")} 
        signUp={() => setAuthState("signUp")} 
        confirmSignUp={() => setAuthState("confirmSignUp")} 
        />
    </>
  )
}

export default CustomAuth;
