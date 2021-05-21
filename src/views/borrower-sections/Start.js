import React from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


function Start(prop) {
  const dispatch = useDispatch()

  let nextScreenId = "Eligibility>Restricted"
  let percentComplete = 1
  
  const handleNextClick = () => {
    //validation

    //save the new form to the navigation path for this user    
    let screenNavigation = Object.assign([], prop.navigation);
    screenNavigation.push(nextScreenId)
    //console.log('Start.js handleNextClick: screenNavigation', screenNavigation)
  
    //update the local store 
    const newForm = {
      ...prop.form,
      screenNavigation: screenNavigation.join(','),
      percentComplete: percentComplete,
    }
    console.log('Start.js handleNextClick: newForm', newForm)
  
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
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <label>Let's determine if you are eligible for a 7(a) loan by answering a few questions</label>
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

export default Start;
