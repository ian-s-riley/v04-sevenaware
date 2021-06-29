import React, {useState} from "react";

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
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function US(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    let nextScreenId = "Eligibility>Eligible"
    let percentComplete = 17

    const handleNextClick = () => {   
        //validation
        if (!form.us) {nextScreenId = "Eligibility>US>No"}

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            us: form.us,
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

    function handleChange(e) {
        const { id, checked } = e.currentTarget;
        setForm({ ...form, [id]: checked })
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
            <Row>
                  <Col className="ml-auto mr-auto" md="10">
                    <br/>
                    <CustomInput
                      type="switch"
                      defaultChecked={form.us}
                      onChange={handleChange}
                      id="us"
                      name="us"
                      color="primary"
                      className="custom-switch-primary h5"
                      label={form.forProfit ? ("Yes, this business is located in the US.") : ("No, this business is not located in the US.")}
                    />
                  </Col>
                </Row>             
            </Form>
            </Col>
            <Col className="d-flex align-items-center" md="2">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
    </div>        
  );
}

export default US;
