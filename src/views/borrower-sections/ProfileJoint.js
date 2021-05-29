import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormText,
  Modal,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CustomInput,
} from "reactstrap";

function ProfileJointTaxes(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");

    //const thisScreenId = "Profile>Joint"
    let nextScreenId = "Profile>Address"
    let percentComplete = "17"

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

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    function handleChange(e) {
        const {id, checked} = e.currentTarget;
        console.log('handleChange - id', id)
        console.log('handleChange - checked', checked)
        setForm({ ...form, [id]: checked})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
              <Row>
                <Col className="ml-auto mr-auto">
                    <ul className="notifications">
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            {form.jointTaxes ? "I file my taxes jointly. " : "I file my taxes individually. "}
                            <CustomInput
                            defaultChecked={form.forProfit}
                            onChange={handleChange}
                            type="switch"
                            id="jointTaxes"
                            name="jointTaxes"
                            className="custom-switch-info"
                            />
                        </li>       
                    </ul>
                </Col>
              </Row>  
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

export default ProfileJointTaxes;
