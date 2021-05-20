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
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function ProfileID(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");

    const thisScreenId = "Profile>ID"
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
                    <Label for="fein" className="control-label">We'll need your FEIN (Federal Employer ID Number)?</Label>
                    <Input 
                    type="text" 
                    name="fein" 
                    id="fein" 
                    onChange = {event => {
                        if (verifyID(event.target.value)) {
                            setIDState("success");
                        } else {
                            setIDState("error");
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

export default ProfileID;
