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


function ProfileBusinessName(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [nameState, setNameState] = useState("");

    const thisScreenId = "Profile>Name"
    let nextScreenId = "Profile>ID"
    let percentComplete = "5"

    const handleNextClick = () => {   
        //validation
        if (nameState !== "success") return
         
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
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">             
                
            <FormGroup>
                    <Label for="dba" className="control-label">Does your business use a DBA?</Label>
                    <Input 
                    type="text" 
                    name="dba" 
                    id="dba" 
                    onChange = {handleChange}
                    />         
                    <FormText>
                        Doing Businss As (DBA)
                    </FormText>
                </FormGroup>  
                
                <FormGroup>
                    <Label for="businessName" className="control-label">What's the name of your business?</Label>
                    <Input 
                    type="text" 
                    name="businessName" 
                    id="businessName" 
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

export default ProfileBusinessName;
