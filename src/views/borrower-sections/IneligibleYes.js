import React, { useState, useEffect } from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
    updateFormAsync,
} from 'features/form/formSlice'
import {
    updateNavigation,
    selectNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    CustomInput,
    UncontrolledTooltip,
} from "reactstrap";


function IneligibleYes(prop) {
    const dispatch = useDispatch()
    const navigation = useSelector(selectNavigation)

    const handleBackClick = () => {
        prop.nextForm(null, "Eligibility>Restricted")
    } 

    return (
        <div className="profile-content section">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="6">
                    <Form className="settings-form">
                        <label>Eligibility Warning</label>
                        <ul className="notifications">
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Your business is ineligible not quality for a 7(a) loan from the SBA. 
                        </li>
                        </ul>
                        <div className="text-center">
                        <Button
                            onClick={handleBackClick}
                            className="btn-just-icon pull-left"
                            id="tooltip924342661"
                            size="sm"
                        >
                            <i className="nc-icon nc-minimal-left" />
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip924342661">
                            Back
                        </UncontrolledTooltip>
                        </div>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default IneligibleYes;
