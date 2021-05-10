import React, {useState, useEffect} from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateForm,  
  selectForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function ProfileSignUp(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [email, setEmail] = useState(prop.form.businessEmail)
    const [emailState, setEmailState] = useState("");
    const [verification, setVerification] = useState("")
    const [verificationState, setVerificationState] = useState("")


    const thisScreenId = "Profile>ConfirmSignUp"
    let nextScreenId = "SignIn"
    let percentComplete = "25"

    async function handleNextClick() {   
        //validation
        if (verificationState !== "success") return
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        //create the new user in amplify, request 2 factor (email auth)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            businessEmail: email,
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateForm(newForm))

        //send a notification

        //amplify auth confirm sign up
        console.log("ProfileConfirmSignIn.js - email", email)
        try {
        await Auth.confirmSignUp(email, verification);
            /* Once the user successfully confirms their account, update form state to show the sign in form*/
            
            //go to the next step, stage, or form
            prop.nextForm(null, screenNavigation)

        } catch (err) { console.log({ err }); }
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
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
                    defaultValue={form.businessEmail}
                    onChange = {event => {
                        if (verifyEmail(event.target.value)) {
                            setEmailState("success");
                        } else {
                            setEmailState("error");
                        }
                        setEmail(event.target.value);
                        }}
                    /> 
                    <FormText>
                    We recommend an equity owner that is an authorized person create the account.
                    </FormText>        
                </FormGroup> 
                <FormGroup className={verificationState === "success" ? "has-success" : null}>
                <Label for="verification" className="control-label">6 Digit Verification Code</Label>
                <Input 
                type="text" 
                name="verification" 
                id="verification" 
                autoComplete="off"
                onChange = {event => {
                    if (event.target.value.length === 6) {
                        setVerificationState("success");
                    } else {
                        setVerificationState("error");
                    }
                    setVerification(event.target.value);
                    }}
                />        
            </FormGroup> 
            
                <hr />
                <div className="text-center">
                    <Button
                        onClick={handleBackClick}
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="sm"
                    >
                        <i className="nc-icon nc-minimal-left" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342662">
                        Previous
                    </UncontrolledTooltip>
                    <Button
                        className="btn-round pull-right"
                        onClick={handleNextClick}
                        color="info"
                        id="tooltip924342661"
                        size="sm"
                    >
                        Confirm Sign Up<i className="nc-icon nc-minimal-right" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342661">
                        Confirm Account
                    </UncontrolledTooltip>
                </div>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default ProfileSignUp;
