import React from "react";

// reactstrap components
import {
    Form,
    Container,
    Row,
    Col,
    Label,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

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
            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
              <Row>
                <Col className="ml-auto mr-auto" md="10">
                    <Label>
                    Your business is ineligible not quality for a 7(a) loan from the SBA due to ineligible business activity.
                    </Label>
                </Col>
              </Row>               
            </Form>
            </Col>
            <Col className="d-flex align-items-center" md="2">

                <Buttons back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
    </div>
        
    );
}

export default IneligibleYes;
