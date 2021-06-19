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
  Modal,
  FormText,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileNACIS(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    console.log('prop.form.nacis', prop.form.nacis)
    const [isDirty, setIsDirty] = useState(false)
    const [nameState, setNameState] = useState("");

    //const thisScreenId = "Profile>NACIS"
    let nextScreenId = "Profile>"
    let percentComplete = "42"

    const handleNextClick = () => {   
        //validation
        if (isDirty && form.usesDba && nameState !== "success") return
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        let newForm = null
        if (isDirty) {
            //update the local form store 
            newForm = { 
                ...form, 
                screenNavigation: screenNavigation.join(','),
                percentComplete: percentComplete,
            }

            //update redux & graphql
            dispatch(updateFormAsync(newForm))

            //send a notification            
        }

        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    // function that returns true if value is email, false otherwise
    const verifyLength = value => {        
        if (value.length > 3) {
        return true;
        }
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
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form">
                <FormGroup className={nameState === "success" ? "has-success" : null}>
                    <Label for="nacis" className="control-label">NACIS</Label>
                    <Input 
                    type="text" 
                    name="nacis" 
                    id="nacis" 
                    defaultValue={form.nacis}
                    onChange = {event => {
                        if (verifyLength(event.target.value)) {
                            setNameState("success");
                        } else {
                            setNameState("error");
                        }
                        handleChange(event)
                        }
                    }
                    />      
                    <FormText>
                    <a href="https://www.census.gov/naics/" target="_blank">https://www.census.gov/naics/</a>
                    </FormText>     
                </FormGroup>
            </Form>

            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>        
    </div> 
    
  );
}

export default ProfileNACIS;
