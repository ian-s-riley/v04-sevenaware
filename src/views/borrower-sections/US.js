import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateForm,  
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


function US(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)

    const thisScreenId = "Eligibility>US"
    let nextScreenId = "Eligibility>Eligible"
    let percentComplete = 17

    const handleNextClick = () => {   
        //validation
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
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">                
                <label>Is your business a for-profit entity?</label>
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
                <label>Is your Business Entity established & located in the US or its territories?</label>
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
    </div>
  );
}

export default US;
