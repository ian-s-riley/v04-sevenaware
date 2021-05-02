import React from "react";
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
} from "reactstrap";


function TEMPLATE() {
  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <Row>
                <Col md="6" sm="6">
                    <FormGroup>
                    <label>First Name</label>
                    <Input
                        className="border-input"
                        placeholder="First Name"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                <Col md="6" sm="6">
                    <FormGroup>
                    <label>Last Email</label>
                    <Input
                        className="border-input"
                        placeholder="Last Name"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                <label>Job Title</label>
                <Input
                    className="border-input"
                    placeholder="Job Title"
                    type="text"
                />
                </FormGroup>
                <FormGroup>
                <label>Description</label>
                <Input
                    placeholder="This is a textarea limited to 150 characters."
                    className="textarea-limited"
                    type="textarea"
                    maxLength="150"
                    rows="3"
                />
                <h5>
                    <small>
                    <span
                        className="pull-right"
                        id="textarea-limited-message"
                    >
                        150 characters left
                    </span>
                    </small>
                </h5>
                </FormGroup>
                <label>Notifications</label>
                <ul className="notifications">
                <li className="notification-item d-flex justify-content-between align-items-center">
                    Updates regarding platform changes{" "}
                    <CustomInput
                    type="switch"
                    defaultChecked
                    id="exampleCustomSwitch-1"
                    name="customSwitch-1"
                    className="custom-switch-info"
                    />
                </li>
                <li className="notification-item d-flex justify-content-between align-items-center">
                    Updates regarding product changes{" "}
                    <CustomInput
                    type="switch"
                    defaultChecked
                    id="exampleCustomSwitch-2"
                    name="customSwitch-2"
                    className="custom-switch-info"
                    />
                </li>
                <li className="notification-item d-flex justify-content-between align-items-center">
                    Weekly newsletter{" "}
                    <CustomInput
                    type="switch"
                    defaultChecked
                    id="exampleCustomSwitch-3"
                    name="customSwitch-3"
                    className="custom-switch-info"
                    />
                </li>
                </ul>
                <div className="text-center">
                <Button
                    className="btn-round pull-left"
                    type="submit"
                >
                    Back
                </Button>
                <Button
                    className="btn-round pull-right"
                    color="info"
                    type="submit"
                >
                    Next
                </Button>
                </div>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default TEMPLATE;
