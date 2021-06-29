import React from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";


function ProfileStart(prop) {
    const dispatch = useDispatch()

    //sconst thisScreenId = "Profile>Start"
    let nextScreenId = "Profile>SignUp"
    let percentComplete = 23

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...prop.form, 
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateForm(newForm))

        //send a notification
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
            <Col className="ml-auto mr-auto" md="8">
            
              <Row>
                <Col className="ml-auto mr-auto h5" md="10">
                    <br/>Let’s get started building your business profile by getting an account email and password set up for secure access to your loan application.
                </Col>
              </Row>
            </Col>
            <Col className="d-flex align-items-center" md="2">
            <Buttons next={handleNextClick} />
            </Col>
        </Row>
        </Container>
    </div>    

  );
}

export default ProfileStart;
