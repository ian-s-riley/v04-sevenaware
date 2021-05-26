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


function Ineligible(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    let nextScreenId = "Eligibility>ForProfit"
    let percentComplete = 7

    const handleNextClick = () => {   
        //validation
        const ineligible =  form.ineligibleNonProfit
                            || form.ineligibleRealEstate
                            || form.ineligibleLending
                            || form.ineligiblePyramid
                            || form.ineligibleGambling
                            || form.ineligibleIllegal
        if (ineligible) {nextScreenId = "Eligibility>Ineligible>Yes"}

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            ineligible: ineligible,
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
            <Col className="ml-auto mr-auto" md="8">
            
            <Form className="settings-form">
              <Row>
                <Col className="ml-auto mr-auto">
                    <ul className="notifications">
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Consumer and marketing cooperatives, charitable, religious, or other non-profit institutions{" "}
                            <CustomInput
                            defaultChecked={form.ineligibleNonProfit}
                            onChange={handleChange}
                            type="switch"
                            id="ineligibleNonProfit"
                            name="ineligibleNonProfit"
                            className="custom-switch-info"
                            />
                        </li> 
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Real estate investment firms{" "}
                            <CustomInput
                            defaultChecked={form.ineligibleRealEstate}
                            onChange={handleChange}
                            type="switch"
                            id="ineligibleRealEstate"
                            name="ineligibleRealEstate"
                            className="custom-switch-info"
                            />
                        </li>   
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Firms involved in lending activities, such as leasing companies, finance companies, and any firm whose stock in trade is money {" "}
                            <CustomInput
                            defaultChecked={form.ineligibleLending}
                            onChange={handleChange}
                            type="switch"
                            id="ineligibleLending"
                            name="ineligibleLending"
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
                            defaultChecked={form.ineligiblePyramid}
                            onChange={handleChange}
                            type="switch"
                            id="ineligiblePyramid"
                            name="ineligiblePyramid"
                            className="custom-switch-info"
                            />
                        </li> 
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Firms involved in gambling activities {" "}
                            <CustomInput
                            defaultChecked={form.ineligibleGambling}
                            onChange={handleChange}
                            type="switch"
                            id="ineligibleGambling"
                            name="ineligibleGambling"
                            className="custom-switch-info"
                            />
                        </li> 
                        <li className="notification-item d-flex justify-content-between align-items-center">
                            Firms involved in illegal activities that are against the law in the jurisdiction where the business is located{" "}
                            <CustomInput
                            defaultChecked={form.ineligibleIllegal}
                            onChange={handleChange}
                            type="switch"
                            id="ineligibleIllegal"
                            name="ineligibleIllegal"
                            className="custom-switch-info"
                            />
                        </li>                
                    </ul>
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

export default Ineligible;
