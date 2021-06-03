import React from "react";

// reactstrap components
import {
    Button,
    Form,
    Container,
    Row,
    Col,
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
                        <Row>
                            <Col className="ml-auto mr-auto align-items-center d-flex" md="2">
                                <Button
                                    onClick={handleBackClick}
                                    className="btn-just-icon pull-left"
                                    id="tooltip924342661"
                                    size="lg"
                                >
                                    <i className="nc-icon nc-minimal-left" />
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip924342661">
                                    Back
                                </UncontrolledTooltip>
                            </Col>
                            <Col className="ml-auto mr-auto" md="8">
                            <label>
                            Your business is ineligible not quality for a 7(a) loan from the SBA due to ineligible business activity.
                            </label>
                            </Col>
                        </Row>                
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default IneligibleYes;