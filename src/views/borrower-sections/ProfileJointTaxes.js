import React, {useState, useEffect} from "react";

//parser for html in text
import parse from 'html-react-parser';
import InputMask from "react-input-mask";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileJointTaxes(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");
    const [idType, setIdType] = useState("SSN");
    const [id, setId] = useState("");
    const [idError, setIdError] = useState(false);

    //const thisScreenId = "Profile>Joint"
    let nextScreenId = "Profile>DBA"
    let percentComplete = "25"

    useEffect(() => {
      //console.log('ProfileJoinTaxes.js - prop.form', prop.form)
      if (prop.form.jointFirstSsn !== "") {
          setIdType("SSN")
          setId(prop.form.jointFirstSsn)
      } else {
          setIdType("TIN")
          setId(prop.form.jointFirstTin)
      }
    }, [])

    const handleNextClick = () => {   
        //validation
        if (isDirty && form.jointTaxes && !form.jointFirst && form.dba === "") return 

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //set the busniess ID
        let businessTin = form.ssn !== "" ? (form.ssn) : (form.tin)
        let businessTinType = form.ssn !== "" ? "SSN" : "TIN"
        
        //if jointly and second use the first tax return id
        if (form.jointTaxes && !form.jointFirst) {          
          businessTin = id
          businessTinType = idType
        }

        //update the local form store         
        let newForm = null
        if (isDirty) {
            const newForm = { 
                ...form, 
                businessTin: businessTin,
                businessTinType: businessTinType,
                jointFirstSsn: idType === "SSN" ? (id) : (""),
                jointFirstTin: idType === "SSN" ? ("") : (id),
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
      //console.log('verifyID - value:', value.substr(0,3))
      if (value.substr(0,3) === '666' || value.substr(0,3) === '000') {return false}
      var idRex = /^[0-9-]*$/;
      if (idRex.test(value)) {
          return true;
      }
      return false;
  };

    function handleChange(e) {
      const {id, checked} = e.currentTarget;
      setForm({ ...form, jointTaxes: (id === "jointRadioYes")})      
      //if (id !== "jointRadioYes") {setId("")}  
      setIsDirty(true)
  }

    function handleChange2(e) {
      const {id, checked} = e.currentTarget
      setForm({ ...form, jointFirst: (id === "jointFirstYes")}) 
      //if (id === "jointFirstYes") {setId("")}
      setIsDirty(true)
    }

    function handleChangeId(e) {
      const {id, value} = e.currentTarget;        
      if (value[0] === "9") {
          setIdType("TIN")
      } else {
          setIdType("SSN")
      }        
      setId(value)
      setIsDirty(true)
  }

  return (
    <div className="profile-content">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form">
            <FormGroup>
            <div className="form-check-radio">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        id="jointRadioNo"
                        name="jointRadios"
                        type="radio"
                        defaultChecked={!form.jointTaxes}
                        onChange={handleChange}
                      />
                      I file my taxes individually. <span className="form-check-sign" />
                    </Label>
                  </div>
            </FormGroup>
            <FormGroup>
              <div className="form-check-radio">
                    <Label check>
                      <Input
                        id="jointRadioYes"
                        name="jointRadios"
                        type="radio"
                        defaultChecked={form.jointTaxes}
                        onChange={handleChange}
                      />
                      I file my taxes jointly. <span className="form-check-sign" />
                    </Label>
                  </div>
            </FormGroup>
            {form.jointTaxes && (
              <>
              <hr />
              <Label>
              Is your {(form.ssn === "" ? "TIN" : "SSN")} listed as the first or second tax ID number on the tax return (is the individual with this user ID listed first or second on the return?
              </Label>
              <FormGroup>
              <div className="form-check-radio">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        id="jointFirstYes"
                        name="jointFirstRadios"
                        type="radio"
                        defaultChecked={form.jointFirst}
                        onChange={handleChange2}
                      />
                      My {(form.ssn === "" ? "TIN" : "SSN")} is listed 1st. <span className="form-check-sign" />
                    </Label>
                  </div>
            </FormGroup>
            <FormGroup>
              <div className="form-check-radio">
                    <Label check>
                      <Input
                        id="jointFirstNo"
                        name="jointFirstRadios"
                        type="radio"
                        defaultChecked={!form.jointFirst}
                        onChange={handleChange2}
                      />
                      My {(form.ssn === "" ? "TIN" : "SSN")} is listed 2nd. <span className="form-check-sign" />
                    </Label>
                  </div>
            </FormGroup>                           
            </>            
            )} 
            {(form.jointTaxes && !form.jointFirst) && (
            <FormGroup className={idState === "success" ? "has-success" : null}>
                <Label for="ssn" className="control-label">Please enter the {idType} listed first on your joint tax return:</Label>
                <InputMask 
                    id="id"
                    mask="999-99-9999" 
                    maskPlaceholder="#"
                    value={id || ""}
                    alwaysShowMask={true}
                    onChange = {event => {
                    if (verifyID(event.target.value)) {
                        setIDState("success");
                    } else {
                        setIDState("error");
                    }
                    handleChangeId(event)
                    }}
                >
                <Input 
                    type="text"                 
                />       
                </InputMask>
            </FormGroup> 
            )}           
            </Form>

            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
    </div> 
  );
}

export default ProfileJointTaxes;
