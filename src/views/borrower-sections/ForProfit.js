import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
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


function Restricted(prop) {
    const dispatch = useDispatch()
    const navigation = useSelector(selectNavigation)
    const [form, setForm] = useState(prop.form)
    //console.log('Restricted.js - form', form)
    const [isDirty, setIsDirty] = useState(false)

    //console.log('Start.js fetchForm: prop.form', prop.form) 

    const handleNextClick = () => {
        let nextScreenId = "Eligibility>ForProfit"
        let percentComplete = 5
        
        //validation
        const restricted =  form.restrictedSpeculative || 
                            form.restrictedPyramid || 
                            form.restrictedPackaging || 
                            form.restrictedLending || 
                            form.restrictedIllegal || 
                            form.restrictedGambling || 
                            form.restrictedCoins;
        if (restricted) {nextScreenId = "Eligibility>Restricted>Yes"}

        //update the local form store 
        const thisForm = { 
            ...form, 
            restricted: restricted,
            screenId: nextScreenId,
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateFormAsync(thisForm))

        //send a notification
  
        //go to the next step, stage, or form
        const newNav = {
            ...navigation, 
            screenId: nextScreenId    
        }
        dispatch(updateNavigation(newNav))
        prop.nextForm(nextScreenId)
    };

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
                <label>Is your business a for profit entity?</label>
                <ul className="notifications">
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Yes, this business is a for profit business{" "}
                        <CustomInput
                        defaultChecked={form.forProfit}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedSpeculative"
                        name="restrictedSpeculative"
                        className="custom-switch-info"
                        />
                    </li>              
                </ul>
                <div className="text-center">
                    <Button
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
                        Next: Eligibility {" > "} For Profit
                    </UncontrolledTooltip>
                </div>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default ForProfit;
