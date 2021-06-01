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
    const [isDirty, setIsDirty] = useState(false)

    //const thisScreenId = "Profile>Entity"
    let nextScreenId = "Profile>FEIN"
    let percentComplete = "10"

    const handleNextClick = () => {   
        //validation
        if (form.entityType === "Select One" || form.entityType === "" || !form.entityType) return
         
        //save the new form to the navigation path for this user    
        if (form.entityType === "Sole Proprietor") { nextScreenId = "Profile>SSN" }
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
        //console.log('handleChange - e.value', e.currentTarget.value)
        const entity = e.currentTarget.value;
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
            <Col className="text-center ml-auto mr-auto" md="6" >
            <FormGroup>
            <UncontrolledDropdown className="btn-group">
                        <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="info"
                        data-toggle="dropdown"
                        type="button"
                        >
                        {form.entityType || "Select One"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Sole Proprietor"
                                id="menuSoleProprietor">
                                Sole Proprietor
                            </DropdownItem>
                            <UncontrolledTooltip placement="top" target="menuSoleProprietor" delay={0}>
                                A <b>sole proprietor</b> personally owns the 100% of the business.
                            </UncontrolledTooltip>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Partnership"
                                id="menuPartnership">
                                Partnership
                            </DropdownItem>
                            <UncontrolledTooltip placement="top" target="menuPartnership" delay={0}>
                                In a <em>partnership</em> ownership of the business is shared with multiple entities.
                            </UncontrolledTooltip>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Corporation">
                                Corporation
                            </DropdownItem>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Limited Liability Company">
                                Limited Liability Company
                            </DropdownItem>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Trust">
                                Trust
                            </DropdownItem>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="Cooperative">
                                Cooperative
                            </DropdownItem>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="ESOP">
                                ESOP
                            </DropdownItem>
                            <DropdownItem 
                                onClick={handleChange} 
                                value="401(k) Plan">
                                401(k) Plan
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> 
            </FormGroup>

            </Col>
            </Row>
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

export default ProfileEntity;
