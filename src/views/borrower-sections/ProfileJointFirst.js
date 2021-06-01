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
    let nextScreenId = "Profile>BusinessTIN"
    let percentComplete = "30"

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        if (form.jointTaxes) { nextScreenId = "Profile>JointFirst" }
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
        //console.log('handleChange - id', id)
        setForm({ ...form, jointTaxes: (id === "jointRadioYes")})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
              <Row>
              <Col className="ml-auto mr-auto" md="6">
                  <div className="form-check-radio">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        id="jointRadioNo"
                        name="jointRadios"
                        type="radio"
                        defaultChecked={!form.jointTaxes}
                        onChange={handleChange}
                      />
                      I file my taxes individually. <span className="form-check-sign" />
                    </Label>
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" md="6">
                  <div className="form-check-radio">
                    <Label check>
                      <Input
                        id="jointRadioYes"
                        name="jointRadios"
                        type="radio"
                        defaultChecked={form.jointTaxes}
                        onChange={handleChange}
                      />
                      I file my taxes jointly. <span className="form-check-sign" />
                    </Label>
                  </div>
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
