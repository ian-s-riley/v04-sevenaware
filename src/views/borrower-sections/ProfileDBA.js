import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
  selectForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileDBA(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [nameState, setNameState] = useState("");

    //const thisScreenId = "Profile>DBA"
    let nextScreenId = "Profile>BusinessName"
    let percentComplete = "35"

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
        const {id, value, checked} = e.currentTarget;
        console.log('profileDBA.js - handleChange - id', id)
        console.log('profileDBA.js - handleChange - value', value)
        console.log('profileDBA.js - handleChange - checked', checked)             
        setForm({ ...form, [id]: id === "usesDba" ? (checked) : (value)})
        setIsDirty(true)
    }

  return (
    <div className="profile-content">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3">{form.usesDba}</Col>
            <Col className="" md="6">
            <Form className="settings-form">

            <FormGroup>
            <div className="d-flex justify-content-between">

                {form.usesDba ? (
                    <Label for="dba" className="control-label">
                        Our business uses use a DBA name.
                    </Label>
                    ) : (
                    <Label for="dba" className="control-label">
                        Our business does <b>not</b> use a DBA name.
                    </Label>
                    )}                    
                    <CustomInput
                    defaultChecked={form.usesDba}
                    onChange={handleChange}
                    type="switch"
                    id="usesDba"
                    name="usesDba"
                    className="custom-switch-primary"
                    />
            </div>
                </FormGroup>  
                {form.usesDba && (
                    <FormGroup className={nameState === "success" ? "has-success" : null}>
                    <Label for="businessName" className="control-label">What is your Doing Business As (“DBA”) tradename?</Label>
                    <Input 
                    type="text" 
                    name="dba" 
                    id="dba" 
                    defaultValue={form.dba}
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
                </FormGroup>  
                )}       

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

export default ProfileDBA;
