import React, { useState } from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

// reactstrap components
import {
  FormGroup,
  Form,
  Label,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileEntity(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)

    //const thisScreenId = "Profile>Entity"
    let nextScreenId = "Profile>FEIN"
    let percentComplete = "10"

    const entityTypes = ["Sole Proprietor", "Partnership", "Corporation", "Limited Liability Company", "Trust", "Cooperative", "ESOP", "401(k) Plan"]

    const handleNextClick = () => {   
        //validation
        if (isDirty && (form.entityType === "Select One" || form.entityType === "" || !form.entityType)) return
         
        //save the new form to the navigation path for this user    
        if (form.entityType === "Sole Proprietor") { nextScreenId = "Profile>ID" }
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

    function handleChange(e) {
        const {value} = e.currentTarget;
        setForm({ ...form, entityType: value})
        setIsDirty(true)
    }

  return (
    <div className="profile-content">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form">
                {entityTypes.map((entityType, key) => {
                    return (
                        <FormGroup key={key}>
                            
                            <div className="d-flex justify-content-between form-check-radio">
                                <Label check>
                                <Input
                                    value={entityType}
                                    name="entityRadios"
                                    type="radio"
                                    defaultChecked={form.entityType === entityType}
                                    onChange={handleChange}
                                />
                                {entityType} <span className="form-check-sign" />
                                </Label>                    
                                <i id={"icon" + key} className="fa fa-2x fa-question-circle-o"></i>
                                <UncontrolledTooltip delay={0} target={"icon" + key}>
                                    A <b>{entityType}</b> business entity...
                                </UncontrolledTooltip>
                            </div> 


                        </FormGroup>        
                    )
                })}                
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

export default ProfileEntity;
