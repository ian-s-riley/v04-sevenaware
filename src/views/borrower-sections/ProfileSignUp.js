import React, {useState, useEffect} from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, listNotifications, listForms } from '../../graphql/queries';
import { createUser as createUserMutation, createForm as createFormMutation } from '../../graphql/mutations';

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
  Modal,
} from "reactstrap";


function ProfileSignUp(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmassword, setConfirmPassword] = useState("");
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [confirmPasswordState, setConfirmPasswordState] = useState("");
    const [userExists, setUserExists] = useState(false);

    const thisScreenId = "Profile>SignUp"
    let nextScreenId = "Profile>ConfirmSignUp"
    let percentComplete = "25"

    async function handleNextClick() {   
        //validation
        if (emailState !== "success") return
         
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
            createNewUserAndForm(user.username, screenNavigation)
        } catch (err) { 
            console.log({ err })
            setUserExists(true)
        }

    };

    //save the new user and form
    async function createNewUserAndForm(newAuthUserId, screenNavigation) {
        //create the new user
        const apiUserData = await API.graphql(
        { query: createUserMutation, 
            variables: { 
                input: {                    
                    userId: newAuthUserId,
                    userType: "Borrower",
                    email: email,
                    sevenAwareAgree: true,
                } 
            } 
        }
        )
        const newUserId = apiUserData.data.createUser.id
        //console.log('newUserAndForm - newUserId', newUserId)
        
        const newFormData = {   
            userId: newUserId,
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
        const apiFormData = await API.graphql(
            { query: createFormMutation, 
                variables: { input: newFormData } 
            }
        )
        const newFormId = apiFormData.data.createForm.id
        setForm({ ...form, id: newFormId, userId: newUserId })

         //go to the next step, stage, or form
         prop.nextForm(null, screenNavigation)
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
        console.log('verifyPassword - value', value)
        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        if (passwordRex.test(value) && value.length > 0) {
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
                <Label for="examplePassword">Password</Label>
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
            <FormGroup>
                <Label for="password2">Confirm Password</Label>
                <Input
                type="text"
                name="password2"
                id="password2"
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
                        className="btn-just-icon pull-right"
                        onClick={handleNextClick}
                        color="info"
                        id="tooltip924342661"
                        size="sm"
                    >
                        <i className="nc-icon nc-minimal-right" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342661">
                        {nextScreenId}
                    </UncontrolledTooltip>
                </div>
            </Form>
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
