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

function ProfileWelcome(prop) {
    
    //const thisScreenId = "Profile>Welcome"
    let nextScreenId = "Profile>Entity"        

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
            <Col className="d-flex align-items-center justify-content-center" md="6">
            <Label>
                This application will guide you through all of the steps necessary to help your back submit your 7(a) loan application to the SBA.
                Let’s gather some initial information on your business to speed-up your application process...</Label>            
            </Col>
            <Col className="d-flex align-items-center" md="3">

                <Buttons next={handleNextClick} />

            </Col>
        </Row>
        </Container>
    </div>

  );
}

export default ProfileWelcome;
