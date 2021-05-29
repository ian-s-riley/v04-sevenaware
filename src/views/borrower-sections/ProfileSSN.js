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
} from "reactstrap";

function ProfileSSN(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");
    const [idType, setIdType] = useState("SSN");
    const [id, setId] = useState("");
    const [expiry, setExpiry] = useState(null);
    const [idError, setIdError] = useState(false);

    //const thisScreenId = "Profile>SSN"
    let nextScreenId = "Profile>Joint"
    let percentComplete = "12"

    const handleNextClick = () => {   
        //validation
        if (idState !== "success") {
            setIdError(true)
            return
        }
        if (idType === "TIN" && !expiry) return 

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        let newForm = null
        if (isDirty) {
          //update the local form store 
          if (idType === "SSN") {
            newForm = { 
              ...form, 
              ssn: id,
              tin: "",
              //tinExpiry: null,
              screenNavigation: screenNavigation.join(','),
              percentComplete: percentComplete,
            }
          } else {
            newForm = { 
              ...form, 
              ssn: "",
              tin: id,
              //tinExpiry: expiry,
              screenNavigation: screenNavigation.join(','),
              percentComplete: percentComplete,
            }
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
        //console.log('verifyID - value:', value.substr(0,3))
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
        } else {
            setIdType("SSN")
        }        
        setId(value)
        setIsDirty(true)
    }

    function handleDateChange(e) {
      //console.log('handleDateChange - e', e._d)
      setExpiry(e._d)
      setIsDirty(true)
  }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="8">
            <Form className="settings-form">                         
                <Label>You indicated that you operate as a {form.entityType}.  Therefore, you use your Social Security Number or Individual Taxpayer Identification Number as your Taxpayer Identification Number, please enter it now:</Label>
                <FormGroup className={idState === "success" ? "has-success" : null}>
                    <Label for="ssn" className="control-label">{idType}</Label>
                    <InputMask 
                        id="id"
                        mask="999-99-9999" 
                        maskPlaceholder="#"
                        value={id}
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
                </FormGroup>  
                {idType === "TIN" && (
                    <FormGroup>
                    <Label for="ssn" className="control-label">ITIN Expiration Date</Label>
                  <InputGroup className="date" id="datetimepicker">
                    <ReactDatetime
                      onChange={handleDateChange}
                      timeFormat={false}
                      inputProps={{
                        className: "form-control",
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <span className="glyphicon glyphicon-calendar">
                          <i className="fa fa-calendar" />
                        </span>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormText>
                    It appears that you applied to the U.S. Government for an Individual Tax Identification ({id}) as your number which you use this as your TIN.  Please indicate the date that it expires.
                  </FormText>
                </FormGroup>
                )} 
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

export default ProfileSSN;
