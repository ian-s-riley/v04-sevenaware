import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  Modal,
  FormText,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileFEIN(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");
    const [idError, setIdError] = useState(false);

    //const thisScreenId = "Profile>FEIN"
    let nextScreenId = "Profile>BusinessName"
    let percentComplete = "25"

    const handleNextClick = () => {   
        //validation
        if (idState !== "success" && !form.noFein && isDirty) {
            setIdError(true)
            return
        }
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        let newForm = null
        if (isDirty) {
            //update the local form store 
            newForm = { 
                ...form, 
                businessTin: form.fein,
                businessTinType: "FEIN",
                screenNavigation: screenNavigation.join(','),
                percentComplete: percentComplete,
            }

            //update redux & graphql
            dispatch(updateFormAsync(newForm))

            //send a notification            
        }

        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    // function that returns true if value is email, false otherwise
    const verifyID = value => {         
        var idRex = /^[0-9-]*$/;
        if (idRex.test(value) && value.length > 0) {
            console.log('verifyPassword - valid', value)          
            return true;
        }
        console.log('verifyPassword - invalid', value)
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;
        setForm({ ...form, [id]: value}) 
        setIsDirty(true)
    }

    function handleCheck(e) {
        const {id, checked} = e.currentTarget;
        setForm({ ...form, [id]: checked}) 
        checked && (setForm({ ...form, fein: ""}))
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="d-flex align-items-center justify-content-center" md="6">
            <Form className="settings-form">
            <FormGroup className={idState === "success" ? "has-success" : null}>
                    <Label for="fein" className="control-label">FEIN</Label>
                    <InputMask 
                        id="fein"
                        mask="99-9999999" 
                        maskPlaceholder="#"
                        value={form.fein || ""}
                        alwaysShowMask={true}
                        onChange = {event => {
                        if (verifyID(event.target.value)) {
                            setIDState("success");
                        } else {
                            setIDState("error");
                        }
                        handleChange(event)
                        }}
                    >
                    <Input 
                        type="text"                 
                    />       
                    </InputMask>
                    <FormText>
                    You indicated that you use a Federal Employer Identification Number (“FEIN”).
                    </FormText>  
                </FormGroup>   
                <FormGroup check>
                    <Label check>
                    <Input 
                        id="noFein"
                        type="checkbox" 
                        defaultChecked={form.noFein}     
                        onClick={handleCheck}
                    />{' '}
                        {form.noFein ? ("I have not received a FEIN from the IRS yet.") : ("Click here if you haven't received a FEIN from the IRS yet.")}
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </Label>
                </FormGroup> 
            </Form>

            </Col>
            <Col className="d-flex align-items-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
        <Modal isOpen={idError} toggle={() => setIdError(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Incorrect FEIN
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIdError(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>It looks like you have not entered a valid FEIN</p>          
        </div>
      </Modal>
    </div> 
    
  );
}

export default ProfileFEIN;
