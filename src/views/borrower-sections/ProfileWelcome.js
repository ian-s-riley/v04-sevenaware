import React, {useState, useEffect} from "react";

//AWS Amplify GraphQL libraries

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'
import {
  selectNavigation,
} from 'features/form/navigationSlice'
import {
    createNotificationAsync,  
} from 'features/notification/notificationSlice'

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


function ProfileWelcome(prop) {
    const dispatch = useDispatch()

    const [form, setForm] = useState(prop.form)
    
    const thisScreenId = "Profile>Welcome"
    let nextScreenId = "Profile>ID"
    let percentComplete = 2            

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
        dispatch(updateFormAsync(newForm))

        //send a notification        
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <label>Let’s gather some initial information on your business to speed-up your application process...</label>
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

export default ProfileWelcome;
