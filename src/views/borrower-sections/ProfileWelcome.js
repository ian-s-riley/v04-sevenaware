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
        <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">
                <Row>                    
                    <Col className="ml-auto mr-auto" md="8">
                    <label>Let’s gather some initial information on your business to speed-up your application process...</label>
                    </Col>
                    <Col className="ml-auto mr-auto align-items-center d-flex" md="2">
                    <Button
                        className="btn-just-icon"
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
                    </Col>
                </Row>                
            </Form>
            </Col>
        </Row>
        </Container>
    </div>    
  );
}

export default ProfileWelcome;
