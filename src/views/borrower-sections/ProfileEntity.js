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
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function ProfileEntity(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [entityType, setEntityType] = useState(prop.form.entityType)
    const [isDirty, setIsDirty] = useState(false)

    //const thisScreenId = "Profile>Entity"
    let nextScreenId = "Profile>FEIN"
    let percentComplete = "5"

    const handleNextClick = () => {   
        //validation
        if (entityType === "Select One" || entityType === "" || !entityType) return
         
        //save the new form to the navigation path for this user    
        if (entityType === "Sole Proprietor") { nextScreenId = "Profile>SSN" }
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        if (isDirty) {
            //update the local form store 
            const newForm = { 
                ...form, 
                entityType: entityType,
                screenNavigation: screenNavigation.join(','),
                percentComplete: percentComplete,
            }

            //update redux & graphql
            dispatch(updateFormAsync(newForm))

            //send a notification

            //go to the next step, stage, or form
            prop.nextForm(newForm, screenNavigation)
        } else {
            //go to the next step, stage, or form
            prop.nextForm(null, screenNavigation)
        }    
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    function handleChange(e) {
        //console.log('handleChange - e.value', e.currentTarget.value)
        const entity = e.currentTarget.value;
        setEntityType(entity)
        setForm({ ...form, entityType: entity})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">     
            <Row>
            <Col className="ml-auto mr-auto" md="8">
            <FormGroup className="has-success">
                <Label>
                Under what type of legal entity does your business operate?
                </Label>
            </FormGroup>
            </Col>
            <Col className="ml-auto mr-auto" md="4">
            <FormGroup className="pull-right">
            <UncontrolledDropdown className="btn-group">
                        <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="info"
                        data-toggle="dropdown"
                        type="button"
                        >
                        {entityType || "Select One"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleChange} value="Sole Proprietor">
                                Sole Proprietor
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="Partnership">
                                Partnership
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="Corporation">
                                Corporation
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="Limited Liability Company">
                                Limited Liability Company
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="Trust">
                                Trust
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="Cooperative">
                                Cooperative
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="ESOP">
                                ESOP
                            </DropdownItem>
                            <DropdownItem onClick={handleChange} value="401(k) Plan">
                                401(k) Plan
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> 
            </FormGroup>

            </Col>
            </Row>
            <hr/>
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

export default ProfileEntity;
