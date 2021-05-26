import React, {useState} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

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
  UncontrolledTooltip,
  FormText,
  Modal,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CustomInput,
} from "reactstrap";

function ProfileJointTaxes(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");
    const [idType, setIdType] = useState("SSN");
    const [idError, setIdError] = useState(false);

    //const thisScreenId = "Profile>Joint"
    let nextScreenId = "Profile>Address"
    let percentComplete = "15"

    const handleNextClick = () => {   
        //validation
        if (idState !== "success") {
            setIdError(true)
            return
        }

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
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

    // function that returns true if value is email, false otherwise
    const verifyID = value => {         
        console.log('verifyID - value:', value.substr(0,3))
        if (value.substr(0,3) === '666' || value.substr(0,3) === '000') {return false}
        var idRex = /^[0-9-]*$/;
        if (idRex.test(value)) {
            return true;
        }
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;
        if (value[0] === "9") {
            setIdType("TIN")
        }
        setForm({ ...form, [id]: value})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">                         
                <FormGroup className={idState === "success" ? "has-success" : null}>
                    <CustomInput
                        defaultChecked={form.ineligibleNonProfit}
                        onChange={handleChange}
                        type="switch"
                        id="ineligibleNonProfit"
                        name="ineligibleNonProfit"
                        className="custom-switch-info"
                        />
                </FormGroup>  
                <hr/>                
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
        <Modal isOpen={idError} toggle={() => setIdError(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Incorrect {idType}
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
          <p>It looks like you have not entered a valid {idType}</p>          
        </div>
      </Modal>
    </div>
  );
}

export default ProfileJointTaxes;
