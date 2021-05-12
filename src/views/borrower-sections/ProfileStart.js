import React, {useState, useEffect} from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm } from '../../graphql/queries';
import { createForm as createFormMutation } from '../../graphql/mutations';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
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


function ProfileStart(prop) {
    const dispatch = useDispatch()

    const [navigation, setNavigation] = useState(useSelector(selectNavigation))
    const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)

    const thisScreenId = "Profile>Start"
    let nextScreenId = "Profile>SignUp"
    let percentComplete = 23

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
                <label>Thank you for beginning the loan application process.  Let’s get started.</label>
                <hr />
                <div className="text-center">
                    <Button
                        className="btn-just-icon pull-right"
                        onClick={handleNextClick}
                        color="info"
                        id="tooltip924342661"
                        size="md"
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
    </div>
  );
}

export default ProfileStart;
