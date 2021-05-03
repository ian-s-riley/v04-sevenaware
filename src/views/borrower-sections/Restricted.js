import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
  selectForm,
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


function Restricted(prop) {
    const dispatch = useDispatch()
    const navigation = useSelector(selectNavigation)
    const [form, setForm] = useState(useSelector(selectForm))
    const [isDirty, setIsDirty] = useState(false)

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

        //update the local form store 
        const newForm = { 
            ...form, 
            restricted: restricted,
            screenId: nextScreenId,
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateFormAsync(newForm))

        //send a notification
  
        //go to the next step, stage, or form
        const newNav = {
            ...navigation, 
            screenId: nextScreenId    
        }
        dispatch(updateNavigation(newNav))
        prop.nextForm(newForm, nextScreenId)
    };

    function handleChange(e) {
        const { id, checked } = e.currentTarget;
        setForm({ ...form, [id]: checked })
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">                
                <label>Does your business generate revenue from any of the following activities?</label>
                <ul className="notifications">
                    <li className="notification-item d-flex justify-content-between align-items-center">
                        Speculative trading activities{" "}
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
                        Dealing in rare coins or stamps{" "}
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
                        Lending{" "}
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
                        Loan packaging{" "}
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
                        Pyramid sales plans{" "}
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
                        Firms involved in illegal activities that are against the law in the jurisdiction where the business is located (including cannabis){" "}
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
                        Gambling{" "}
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
                <div className="text-center">
                    <Button
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="sm"
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
                        size="sm"
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
