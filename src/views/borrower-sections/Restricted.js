import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function Restricted(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    let nextScreenId = "Eligibility>Ineligible"
    let percentComplete = 5

    const handleNextClick = () => {   
        //validation
        const restricted =  form.restrictedSpeculative || 
                            form.restrictedPyramid || 
                            form.restrictedPackaging || 
                            form.restrictedLending || 
                            form.restrictedIllegal || 
                            form.restrictedGambling || 
                            form.restrictedCoins;
        if (restricted) {nextScreenId = "Eligibility>Restricted>Yes"}

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            restricted: restricted,
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateForm(newForm))

        //send a notification
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    function handleChange(e) {
        const { id, checked } = e.currentTarget;
        setForm({ ...form, [id]: checked })
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">                
                <label>Does your business generate revenue from any of the following activities:</label>
                <ul className="notifications">
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Speculative trading activities?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedSpeculative}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedSpeculative"
                        name="restrictedSpeculative"
                        className="custom-switch-info"
                        />
                    </li> 
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Dealing in rare coins or stamps?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedCoins}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedCoins"
                        name="restrictedCoins"
                        className="custom-switch-info"
                        />
                    </li>   
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Lending?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedLending}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedLending"
                        name="restrictedLending"
                        className="custom-switch-info"
                        />
                    </li> 
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Loan packaging?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedPackaging}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedPackaging"
                        name="restrictedPackaging"
                        className="custom-switch-info"
                        />
                    </li> 
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Pyramid sales plans?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedPyramid}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedPyramid"
                        name="restrictedPyramid"
                        className="custom-switch-info"
                        />
                    </li> 
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Firms involved in illegal activities that are against the law in the jurisdiction where the business is located (including cannabis)?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedIllegal}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedIllegal"
                        name="restrictedIllegal"
                        className="custom-switch-info"
                        />
                    </li> 
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Gambling?{" "}
                        <CustomInput
                        defaultChecked={form.restrictedGambling}
                        onChange={handleChange}
                        type="switch"
                        id="restrictedGambling"
                        name="restrictedGambling"
                        className="custom-switch-info"
                        />
                    </li>                
                </ul>
                <hr />
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

export default Restricted;
