import React, {useState} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
  updateForm,
} from 'features/form/formSlice'
import {
  updateNavigation,
  selectNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function Eligible(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)

    const thisScreenId = "Eligibility>Eligible"
    let nextScreenId = "Profile>Start"
    let percentComplete = 20

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateForm(newForm))

        //send a notification

        //tell the parent page to create a new user & form
        //prop.newUserAndForm()

        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <h5>It looks like your entity is eligible for a 7(a) loan.</h5>
                <label>
                If you click on the ‘APPLY NOW’ button you will be invited to create a password protected account. We have found it a good practice to have an equity owner and authorized person create the account.
                </label>
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
                        className="pull-right btn-round"
                        onClick={handleNextClick}
                        color="info"
                        id="tooltip924342661"
                        size="sm"
                    >
                        Apply Now
                        <i className="nc-icon nc-minimal-right" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342661">
                        Apply Now
                    </UncontrolledTooltip>
                </div>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default Eligible;
