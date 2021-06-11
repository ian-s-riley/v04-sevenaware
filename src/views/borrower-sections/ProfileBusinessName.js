import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
  selectForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileBusinessName(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [nameState, setNameState] = useState("");

    //const thisScreenId = "Profile>"
    let nextScreenId = "Profile>BusinessAddress"
    let percentComplete = "40"

    const handleNextClick = () => {   
        //validation
        if (isDirty && nameState !== "success") return
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        let newForm = null
        if (isDirty) {
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
    <div className="profile-content">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form"> 
                
                <FormGroup>
                    <Label for="businessName" className="control-label">What is the legal name of your business?</Label>
                    <Input 
                    type="text" 
                    name="businessName" 
                    id="businessName" 
                    defaultValue={form.businessName}
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

export default ProfileBusinessName;
