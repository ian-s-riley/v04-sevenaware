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


function US(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    let nextScreenId = "Eligibility>Eligible"
    let percentComplete = 17

    const handleNextClick = () => {   
        //validation
        if (!form.forProfit) {nextScreenId = "Eligibility>ForProfit>No"}
        if (!form.us) {nextScreenId = "Eligibility>US>No"}

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            forProfit: form.forProfit,
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
            <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">                
                <ul className="notifications">
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        {form.forProfit ? "Yes, this is a for profit business. " : "No, this is a non-profit business. "}
                        <CustomInput
                        defaultChecked={form.forProfit}
                        onChange={handleChange}
                        type="switch"
                        id="forProfit"
                        name="forProfit"
                        className="custom-switch-info"
                        />
                    </li>                                  
                </ul>
                <ul className="notifications">
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        {form.us ? "Yes, this is a US business. " : "No, this is not a US business. "}
                        <CustomInput
                        defaultChecked={form.us}
                        onChange={handleChange}
                        type="switch"
                        id="us"
                        name="us"
                        className="custom-switch-info"
                        />
                    </li>                                
                </ul>
                <hr />
                <div className="text-center">
                    <Button
                        onClick={handleBackClick}
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="lg"
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
                        size="lg"
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

export default US;
