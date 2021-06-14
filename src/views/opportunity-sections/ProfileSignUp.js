import React, {useState} from "react";
import { useHistory } from "react-router-dom";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { 
    createUser as createUserMutation, 
    createForm as createFormMutation,
} from '../../graphql/mutations';

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,  
} from 'features/form/formSlice'
import {
    createNotificationAsync,  
} from 'features/notification/notificationSlice'

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
  UncontrolledTooltip,
  Modal,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileSignUp(prop) {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [password2State, setPassword2State] = useState("");
    const [userExists, setUserExists] = useState(false);
    const [agreeSevenAware, setAgreeSevenAware] = useState(false);

    //const thisScreenId = "Profile>SignUp"
    let percentComplete = "0"                        

    async function handleNextClick() {   
        //validation
        if (emailState !== "success") {return false}
        if (passwordState !== "success") {return false}
        if (password2State !== "success") {return false}
        if (!agreeSevenAware) {return false}

        //amplify auth sign up
        try {
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email
                }});
            /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
            //create the user record
            createNewUserAndForm(user.username)
        } catch (err) { 
            console.log({ err })
            setUserExists(true)
        }

    };

    //save the new user and form
    async function createNewUserAndForm(newUserName) {
        //create the new user
        await API.graphql(
        { query: createUserMutation, 
            variables: { 
                input: {                    
                    userId: newUserName,
                    userType: "Borrower",
                    email: email,
                    sevenAwareAgree: true,
                } 
            } 
        }
        )
        //const newUserId = apiUserData.data.createUser.id
        //console.log('newUserAndForm - newUserId', newUserId)
        
        const newFormData = {   
            userId: newUserName,
            screenNavigation: "Profile>Welcome", 
            percentComplete: 0,
            loanAmount: 0,           
            restricted: false,
            restrictedSpeculative: false,
            restrictedCoins: false,
            restrictedLending: false,
            restrictedPackaging: false,
            restrictedPyramid: false,
            restrictedIllegal: false,
            restrictedGambling: false,
            ineligible: false,
            ineligibleNonProfit: false,
            ineligibleRealestate: false,
            ineligibleLending: false,
            ineligiblePyramid: false,
            ineligibleGambling: false,
            ineligibleIllegal: false,
            forProfit: true,
            us: true,
            businessEmail: email,
        }    

        //create the new form for this user
        await API.graphql(
            { query: createFormMutation, 
                variables: { input: newFormData } 
            }
        )

        //update the local form store 
        const newForm = { 
            ...prop.form, 
            businessEmail: email,
        }

        //update redux & graphql
        dispatch(updateForm(newForm))                           

         //go to the next step, stage, or form
         history.replace("/verify")    
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

    const verifyPassword = value => {
        
        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/
        //console.log('verifyPassword - passwordRex.test(' + value + ')', passwordRex.test(value))
        if (passwordRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

    const verifyPassword2 = value => {        
        if (value === password) {
        return true;
        }
        return false;
    };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">                
                <FormGroup className={emailState === "success" ? "has-success" : null}>
                <Label for="businessEmail" className="control-label">Email Address (User ID)</Label>
                <Input 
                type="text" 
                name="businessEmail" 
                id="businessEmail" 
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
            <Row>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup className={passwordState === "success" ? "has-success" : null}>
                <Label for="password">Password</Label>
                <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange = {event => {
                    if (verifyPassword(event.target.value)) {
                        setPasswordState("success");
                    } else {
                        setPasswordState("error");
                    }
                    setPassword(event.target.value);
                    }}
                />    
            </FormGroup>
            </Col>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup className={password2State === "success" ? "has-success" : null}>
                <Label for="password2">Confirm Password</Label>
                <Input
                type="password"
                name="password2"
                id="password2"
                autoComplete="off"
                onChange = {event => {
                    if (verifyPassword2(event.target.value)) {
                        setPassword2State("success");
                    } else {
                        setPassword2State("error");
                    }
                    }}
                />
            </FormGroup>

            </Col>
            </Row>

                <FormGroup check>
                    <Label check>
                    <Input 
                        id="agreeSevenAware"
                        type="checkbox" 
                        defaultChecked={agreeSevenAware}     
                        onClick={() => setAgreeSevenAware(!agreeSevenAware)}
                    />{' '}
                        I understand how 7(a)ware will use and protect my data. And I agree to the terms & conditions.
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </Label>
                </FormGroup> 
            </Form>

            </Col>
            <Col className="d-flex align-items-center" md="2">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
        <Modal isOpen={userExists} toggle={() => setUserExists(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            You've already got an account.
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setUserExists(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Your email/username (<small>{email}</small>) already already exists in the system. Please sign in or verify your account to continue.</p>          
        </div>
      </Modal>
    </div>

  );
}

export default ProfileSignUp;
