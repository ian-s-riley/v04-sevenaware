import React, {useState} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  createFormAsync,
  updateFormAsync,  
  selectForm,
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


function Start(prop) {
  const dispatch = useDispatch()
  const navigation = useSelector(selectNavigation)

  let nextScreenId = "Eligibility>Restricted"
  let percentComplete = 1
  
  const handleNextClick = () => {
    //validation
  
    //update the local store 
    const newForm = {
      ...prop.form,
      screenId: nextScreenId,
      percentComplete: percentComplete,
    }
    //console.log('Start.js handleNextClick: newForm', newForm)
  
    //update redux & graphql
    dispatch(updateFormAsync(newForm))

    //send a notification
  
    //go to the next step, stage, or form
    const newNav = {
      ...navigation, 
      screenId: nextScreenId,      
    }
    dispatch(updateNavigation(newNav))

    //tell the parent screen what to show next
    prop.nextForm(newForm, nextScreenId)
  };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <label>New SBA 7(a) loan application.</label>
                <ul className="notifications">
                  <li className="notification-item d-flex justify-content-between align-items-center">
                    Let's determine if you are eligible for a 7(a) loan by answering a few questions
                  </li>
                </ul>
                <div className="text-center">
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
    </div>
  );
}

export default Start;
