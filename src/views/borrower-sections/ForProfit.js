import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
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


function ForProfit(prop) {
    const dispatch = useDispatch()
    const navigation = useSelector(selectNavigation)
    const [form, setForm] = useState(useSelector(selectForm))
    const [isDirty, setIsDirty] = useState(false)

    let nextScreenId = "Eligibility>US"
    let percentComplete = 10

    const handleNextClick = () => {
        //validation
        if (!form.forProfit) {nextScreenId = "Eligibility>ForProfit>No"}

        //update the local form store 
        const newForm = { 
            ...form, 
            screenId: nextScreenId,
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateFormAsync(newForm))

        //send a notification
  
        //go to the next step, stage, or form
        const newNav = {
            ...navigation, 
            screenId: nextScreenId    
        }
        dispatch(updateNavigation(newNav))
        prop.nextForm(newForm, nextScreenId)
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
                <hr />
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

export default ForProfit;
