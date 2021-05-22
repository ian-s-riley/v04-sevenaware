import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

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
} from "reactstrap";

function ProfileFEIN(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");

    //const thisScreenId = "Profile>ID"
    let nextScreenId = "Profile>Address"
    let percentComplete = "12"

    const handleNextClick = () => {   
        //validation
        if (idState !== "success") return
         
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

    // function that returns true if value is email, false otherwise
    const verifyID = value => {         
        var idRex = /^[0-9-]*$/;
        if (idRex.test(value) && value.length > 0) {
            console.log('verifyPassword - valid', value)
            return true;
        }
        console.log('verifyPassword - invalid', value)
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;
        setForm({ ...form, [id]: value})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">                         
                <Label>Please enter your <b>{prop.form.entityType}’s</b> Federal Employer Identification Number:</Label>
                <FormGroup className={idState === "success" ? "has-success" : null}>
                    <Label for="fein" className="control-label">FEIN</Label>
                    <InputMask 
                        id="fein"
                        mask="99-9999999" 
                        maskPlaceholder="#"
                        value={form.fein || ""}
                        alwaysShowMask={true}
                        onChange = {event => {
                        if (verifyID(event.target.value)) {
                            setIDState("success");
                        } else {
                            setIDState("error");
                        }
                        handleChange(event)
                        }}
                    >
                    <Input 
                        type="text"                 
                    />       
                    </InputMask>
                    <FormText>
                    You indicated that you use a Federal Employer Identification Number (“FEIN”).
                    </FormText>  
                </FormGroup>   
                <FormGroup check>
                    <Label check>
                    <Input 
                        id="noFein"
                        type="checkbox" 
                        defaultChecked={form.noFein}     
                        onClick={handleChange}
                    />{' '}
                        I have not received a FEIN from the IRS yet.
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </Label>
                </FormGroup> 
                <div className="text-center">
                    <Button
                        onClick={handleBackClick}
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="md"
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

export default ProfileFEIN;
