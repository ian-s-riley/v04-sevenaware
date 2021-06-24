import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function Ownership(prop) {
    
    //const thisScreenId = "Ownership>"
    let nextScreenId = "Ownership>"        

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = null
        
        //update redux & graphql

        //send a notification        
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="d-flex align-items-center" md="6">
              <Label>
              We need to know if you have: 1) any Affiliates (think Franchise/Jobber agreements or other entities that you control), 2) have any Associates / Key Employees, and or officers or directors?
              </Label>            
            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">
                <Buttons next={handleNextClick} />
            </Col>
        </Row>
        </Container>
    </div>

  );
}

export default Ownership;
