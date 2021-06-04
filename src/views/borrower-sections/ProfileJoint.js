import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileJointTaxes(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");

    //const thisScreenId = "Profile>Joint"
    let nextScreenId = "Profile>BusinessTIN"
    let percentComplete = "25"

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        if (form.jointTaxes) { nextScreenId = "Profile>JointFirst" }
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        let newForm = null
        if (isDirty) {
            const newForm = { 
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
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="d-flex align-items-center justify-content-center" md="6">
            <Form className="settings-form">
            <FormGroup>
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
            </FormGroup>
            <FormGroup>
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
            </FormGroup>
            </Form>

            </Col>
            <Col className="d-flex align-items-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
    </div> 
  );
}

export default ProfileJointTaxes;
