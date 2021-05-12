import React, { useState, useEffect } from "react";

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

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
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
                            Your business is ineligible not quality for a 7(a) loan from the SBA due to ineligible business activity.
                        </li>
                        </ul>
                        <div className="text-center">
                        <Button
                            onClick={handleBackClick}
                            className="btn-just-icon pull-left"
                            id="tooltip924342661"
                            size="md"
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
