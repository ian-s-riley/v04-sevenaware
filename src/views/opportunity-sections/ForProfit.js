import React, {useState} from "react";

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
  CustomInput,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";


function ForProfit(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    let nextScreenId = "Eligibility>US"
    let percentComplete = 12

    const handleNextClick = () => {   
        //validation
        if (!form.forProfit) {nextScreenId = "Eligibility>ForProfit>No"}

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            forProfit: form.forProfit,
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
                <Row>
                  <Col className="ml-auto mr-auto" md="10">
                    <br/>
                    <CustomInput
                      type="switch"
                      defaultChecked={form.forProfit}
                      onChange={handleChange}
                      id="forProfit"
                      name="forProfit"
                      className="custom-switch-primary h5"
                      label={form.forProfit ? ("Yes, this is a for profit business. ") : ("No, this is a non-profit business. ")}
                    />
                  </Col>
                </Row> 
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

export default ForProfit;
