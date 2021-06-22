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
  Table,
  UncontrolledTooltip,
  FormText,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

const nacisCodes = [
    {code: "11", industry: "Agriculture, Forestry, Fishing and Hunting", count: "378,985"},
    {code: "21",industry:"Mining",count:"48,541"},
    {code: "22",industry:"Utilities",count:"32,553"},
    {code: "23",industry:"Construction",count:"1,531,519"},
    {code: "31-33",industry:"Manufacturing",count:"646,567"},
    {code: "42",industry:"Wholesale Trade",count:"703,250"},
    {code: "44-45",industry:"Retail Trade",count:"1,829,808"},
    {code: "48-49",industry:"Transportation and Warehousing",count:"622,292"},
    {code: "51",industry:"Information",count:"375,431"},
    {code: "52",industry:"Finance and Insurance",count:"790,163"},
    {code: "53",industry:"Real Estate Rental and Leasing",count:"892,199"},
    {code: "54",industry:"Professional, Scientific, and Technical Services",count:"2,426,347"},
    {code: "55",industry:"Management of Companies and Enterprises",count:"75,547"},
    {code: "56",industry:"Administrative and Support and Waste Management and Remediation Services",count:"1,615,690"},
    {code: "61",industry:"Educational Services",count:"431,374"},
    {code: "62",industry:"Health Care and Social Assistance",count:"1,772,014"},
    {code: "71",industry:"Arts, Entertainment, and Recreation",count:"383,209"},
    {code: "72",industry:"Accommodation and Food Services",count:"915,629"},
    {code: "81",industry:"Other Services (except Public Administration)",count:"1,950,496"},
    {code: "92",industry:"Public Administration",count:"255,711"},
    {code: "",industry:"Total Business Establishments",count:"17,677,325"},
]


function ProfileNACIS(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [nameState, setNameState] = useState("");

    //const thisScreenId = "Profile>NACIS"
    let nextScreenId = "Ownership>"
    let percentComplete = "42"

    const handleNextClick = () => {   
        //validation
        if (isDirty && nameState !== "success") return
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        let newForm = null
        if (isDirty) {
            //update the local form store 
            newForm = { 
                ...form, 
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
    const verifyId = value => {        
        if (value.length > 3) {
        return true;
        }
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;
        setForm({ ...form, [id]: value}) 
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <>
            <Form className="settings-form">
                <FormGroup className={nameState === "success" ? "has-success" : null}>
                    <Label for="nacis" className="control-label">NACIS</Label>
                    <InputMask 
                        id="nacis"
                        mask="99-9999999" 
                        maskPlaceholder="#"
                        value={form.nacis || ""}
                        alwaysShowMask={true}
                        onChange = {event => {
                        if (verifyId(event.target.value)) {
                            setNameState("success");
                        } else {
                            setNameState("error");
                        }
                        handleChange(event)
                        }}
                        >
                        <Input 
                            type="text"                 
                        />   
                    </InputMask>
                    <FormText>
                    <a href="https://www.census.gov/naics/" target="_blank">https://www.census.gov/naics/</a>
                    </FormText>     
                </FormGroup>
            </Form>
            
            </>

            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        <Row>
        <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
        <Col className="justify-content-center" md="6">
        <Table>
        <thead>
          <tr>
            <th className="text-center">Code</th>
            <th>Industry Title</th>
            <th className="text-right">US Businesses</th>
          </tr>
        </thead>
        <tbody>
          {nacisCodes.map((nacisCode, key) => {
            return (
            <tr key={key}>
            <td className="text-center">{nacisCode.code}</td>
            <td>{nacisCode.industry}</td>
            <td className="text-right">{nacisCode.count}</td>
          </tr>
            )
            }
          )}
          
        </tbody>
      </Table>
        </Col>
        <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
        </Row>
        </Container>        
    </div> 
    
  );
}

export default ProfileNACIS;
