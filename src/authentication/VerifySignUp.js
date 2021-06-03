import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

import AuthNavBar from "components/Navbars/AuthNavBar";
import AuthHeader from "components/Headers/AuthHeader";
import FooterAuth from "components/Footers/FooterAuth";

// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Label,
    FormText,
    Input,
    Container,
    Row,
    Col,
    Modal,
} from "reactstrap";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const initialErrorState = { error: false, title: "", message: "" }

function VerifySignUp(prop) {
    const history = useHistory()

    const [email, setEmail] = useState(prop.email)
    const [emailState, setEmailState] = useState("");
    const [verification, setVerification] = useState("")
    const [verificationState, setVerificationState] = useState("")
    const [authError, setAuthError] = useState(initialErrorState)
    const [loading, setLoading] = useState(false);
    //console.log('ProfileConfirmSignup.js - authError', authError)

    async function verifySignUp() {
        //validation
        if (verificationState !== "success") return

        setLoading(true)
        //amplify auth confirm sign up
        try {
            await Auth.confirmSignUp(email, verification);
            history.replace("/signin")    

        } catch (err) {
            console.log({ err });
            setLoading(false)
            switch (err.code) {
                case "NotAuthorizedException":
                    setAuthError({
                        error: true,
                        title: "You've already verified this account.",
                        message: "Your email/username (" + email + ") has already been verified and confirmed. Please sign in or verify your account to continue."
                    })
                    break;
                case "UserNotFoundException":
                    setAuthError({
                        error: true,
                        title: "Email/username not found.",
                        message: "This email/username (" + email + ") was not found in our system. Please check the email address or go back to sign up with it."
                    })
                    break;
                case "CodeMismatchException":
                    setAuthError({
                        error: true,
                        title: "Incorrect Verification Code.",
                        message: "This verificatino code does not match the one sent to your email/username (" + email + "). Please check the check the code and try again."
                    })
                    break;
                default:
                    setAuthError({
                        error: true,
                        title: "Confimration Error.",
                        message: err.message
                    })
            }
            if (err.code === "NotAuthorizedException") {

            }
        }
    };

    async function resendConfirmationCode() {
        if (emailState === "success") {
            try {
                await Auth.resendSignUp(email);
                console.log('code resent successfully');
            } catch (err) {
                console.log('error resending code: ', err);
            }
        }        
    }

    // function that returns true if value is email, false otherwise
    const verifyEmail = value => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value) && value.length > 0) {
            return true;
        }
        return false;
    };

    return (
        <>
            <AuthNavBar />
            <AuthHeader />
            <div className="wrapper">
                <div className="profile-content section-white-gray">
                    <Container>
                        <Row className="owner">
                            <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                                <div className="name">
                                    <h4>
                                        Please verify your account.
                </h4>
                                </div>
                            </Col>
                        </Row>
                        <div className="profile-tabs">
                            <div className="profile-content section">
                                <Container>
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="6">
                                            <Form className="settings-form">
                                                <FormGroup className={emailState === "success" ? "has-success" : null}>
                                                    <Label for="businessEmail" className="control-label">Email Address (User ID)</Label>
                                                    <Input
                                                        type="text"
                                                        name="businessEmail"
                                                        id="businessEmail"
                                                        defaultValue={prop.email}
                                                        onChange={event => {
                                                            if (verifyEmail(event.target.value)) {
                                                                setEmailState("success");
                                                            } else {
                                                                setEmailState("error");
                                                            }
                                                            setEmail(event.target.value);
                                                        }}
                                                    />
                                                    <FormText>
                                                        Please enter the email address you used to sign up for your7(a)ware account.
                    </FormText>
                                                </FormGroup>
                                                <FormGroup className={verificationState === "success" ? "has-success" : null}>
                                                    <Label for="verification" className="control-label">6 Digit Verification Code</Label>
                                                    <Input
                                                        type="text"
                                                        name="verification"
                                                        id="verification"
                                                        autoComplete="off"
                                                        onChange={event => {
                                                            if (event.target.value.length === 6) {
                                                                setVerificationState("success");
                                                            } else {
                                                                setVerificationState("error");
                                                            }
                                                            setVerification(event.target.value);
                                                        }}
                                                    />
                                                    <FormText>
                                                        <a href="#7aware" onClick={resendConfirmationCode}>
                                                        Resend verification code?
                                                        </a>
                                                    </FormText>
                                                </FormGroup>

                                                <div className="text-center">
                                                {loading ? (
                                                    <div className="sweet-loading pull-right">
                                                        <PulseLoader color={"#51bcda"} loading={loading} css={override} size={15} />
                                                    </div> 
                                                ) : (
                                                    <Button
                                                        className="btn-round"
                                                        onClick={verifySignUp}
                                                        color="primary"
                                                        id="tooltip924342661"
                                                        size="md"
                                                    >
                                                        Confirm Sign Up
                                                    </Button>
                                                )}                                                      
                                                </div>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                                <Modal isOpen={authError.error} toggle={() => setAuthError(initialErrorState)}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLiveLabel">
                                            {authError.title}
                                        </h5>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => setAuthError(initialErrorState)}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>{authError.message}</p>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <FooterAuth />
        </>
    );
}

export default VerifySignUp;
