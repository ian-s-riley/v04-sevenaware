import React from "react";

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
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";


function Eligible(prop) {
    const dispatch = useDispatch()    
    let nextScreenId = "Profile>Start"
    let percentComplete = 20

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...prop.form, 
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateForm(newForm))

        //send a notification

        //tell the parent page to create a new user & form
        //prop.newUserAndForm()

        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

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
                    <h5>
                        Click on the ‘APPLY NOW’ button to be invited to create a password protected account.
                        <br/><br/><small>We have found it a good practice to have an equity owner and authorized person create the account.</small>
                        </h5>
                </Col>
              </Row>               
            </Form>
            </Col>
            <Col className="d-flex align-items-center" md="2">
            
            <div className="">
              <div style={{width: "180px"}}>
              <Button
                  className="btn-round "
                  onClick={handleNextClick}
                  color="primary"
                  id="tooltip924342661"
                  size="lg"
              >
                  Apply Now
                  <i className="nc-icon nc-minimal-right" />
              </Button>
              </div>

              <div className="following2">
              <a href="#">
                  <Button
                      className="btn-just-icon"
                      color=""
                      id="tooltip924342355"
                      size="sm"
                  >
                      <i className={"nc-icon nc-minimal-left"} />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip924342355">
                      Back
                  </UncontrolledTooltip>
                  </a>
              </div>                   
              
          </div> 

            </Col>
        </Row>
        </Container>
    </div>
        
  );
}

export default Eligible;
