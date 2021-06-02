import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Form,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";


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
            <Col className="ml-auto mr-auto" md="2"></Col>
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
              <Row>
                <Col className="ml-auto mr-auto" md="10">
                    <ul className="notifications">
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Speculative trading activities?{" "}
                            <CustomInput
                            defaultChecked={form.restrictedSpeculative}
                            onChange={handleChange}
                            type="switch"
                            id="restrictedSpeculative"
                            name="restrictedSpeculative"
                            className="custom-switch-primary"
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
                            className="custom-switch-primary"
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
                            className="custom-switch-primary"
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
                            className="custom-switch-primary"
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
                            className="custom-switch-primary"
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
                            className="custom-switch-primary"
                            />
                        </li>       
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                            Firms involved in illegal activities that are against the law in the jurisdiction where the business is located (including cannabis)?{" "}
                            </div>
                            <CustomInput
                            defaultChecked={form.restrictedIllegal}
                            onChange={handleChange}
                            type="switch"
                            id="restrictedIllegal"
                            name="restrictedIllegal"
                            className="custom-switch-primary"
                            />
                        </li>          
                    </ul>
                </Col>
              </Row>               
            </Form>
            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="2">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default Restricted;
