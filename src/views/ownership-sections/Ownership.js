import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { formatDiagnostic } from "typescript";

// core components
import Buttons from "../opportunity-sections/Buttons";

function Ownership(prop) {
    const dispatch = useDispatch()

    const [form, setForm] = useState(prop.form)
    
    //const thisScreenId = "Ownership>"
    let nextScreenId = "Ownership>Owners"        

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update redux & graphql
        const newForm = { 
            ...form, 
            screenNavigation: screenNavigation.join(','),
        }

        //update redux & graphql
        dispatch(updateFormAsync(newForm))

        //send a notification        
  
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
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="justify-content-center" md="6">
            {prop.form.entityType === "Sole Proprietor" ? (
              <>
              <Row>
              <Col className="d-flex align-items-center justify-content-center" md="1">
              <span className="numberCircle">&#9312;</span>
              </Col>
              <Col className="d-flex align-items-center" md="11">
              Any affiliates (think Franchise/Jobber agreements or other entities that you control?
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-center" md="1">
              <span className="numberCircle">&#9313;</span>
              </Col>
              <Col className="d-flex align-items-center" md="11">
              Any Associates/Key Employees, and or officers or directors?
              </Col>
            </Row>
            </>
            ) : (
              "We need you to list all officers and directors.  We will also have you provide the email address of all equity owners (individuals or entities), officers and or directors. We will send them an email and have them log-in, just as you did, and will have them fill out the information specific to them which is necessary for this application."
            )}


            </Col>
              
            <Col className="d-flex align-items-center justify-content-center" md="3">
            <Buttons next={handleNextClick} back={handleBackClick}/>
            </Col>
        </Row>
        </Container>
    </div>

  );
}

export default Ownership;
