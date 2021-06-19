import React, {useState, useEffect} from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getAddress } from '../../graphql/queries';
import { 
    createAddress as createAddressMutation,
} from '../../graphql/mutations';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
  selectForm,
} from 'features/form/formSlice'
import {
    updateAddressAsync
  } from 'features/form/addressSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

//address verification
const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

const usStates =  ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"]

function ProfileBusinessAddress(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)    

    const [addressModal, setAddressModal] = useState(false);
    const [addressMessage, setAddressMessage] = useState();
    const [address, setAddress] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        zipPlus4: "",
        county: "",
        country: "",
    })
    const [address1State, setAddress1State] = useState("")
    const [cityState, setCityState] = useState("")
    const [zipState, setZipState] = useState("");

    //const thisScreenId = "Profile>Address"
    let nextScreenId = "Profile>"
    let percentComplete = "45"

    useEffect(() => {
        fetchAddress()
    }, [])

    async function fetchAddress() {
        //lookup the address for this form and put it into the local store
        console.log("ProfileBusinessAddress - form.businessAddressId", prop.form.businessAddressId)
        if (prop.form.businessAddressId) {
          const addressFromAPI = await API.graphql(graphqlOperation(getAddress, {
            id: prop.form.businessAddressId,
          }))  
          console.log('fetchAddress: addressFromAPI', addressFromAPI)
          setAddress(addressFromAPI.data.getAddress)          
        }
      }

    

    async function handleNextClick() {
        console.log('handleNextClic - ')
        //validation
        if (isDirty && (address1State !== "success" || cityState !== "success" || zipState !== "success")) return

        //if (isDirty) {
            let authId = "5754b539-a016-8109-970c-4c11834d47cb"
            let authToken = "asVs4YKeYeeUx29M1XeJ"
            const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken)
            let client = SmartyStreetsCore.buildClient.usStreet(credentials)
    
                let lookup1 = new Lookup();
                lookup1.street = address.address1
                lookup1.street2 = address.address2
                lookup1.city = address.city
                lookup1.state = address.state
                lookup1.zipCode = address.zip
                lookup1.maxCandidates = 3;
                lookup1.match = "invalid"; // "invalid" is the most permissive match,
                // this will always return at least one result even if the address is invalid.
                // Refer to the documentation for additional MatchStrategy options.
          
                client.send(lookup1)
                  .then(handleSuccess)
                  .catch(handleError)
        // } else {
        //     //save the new form to the navigation path for this user    
        //     let screenNavigation = Object.assign([], prop.navigation);
        //     screenNavigation.push(nextScreenId)

        //     //go to the next step, stage, or form
        //     prop.nextForm(null, screenNavigation)
        // }
    }

    function handleSuccess(response) {
        response.lookups.map(lookup => console.log(lookup.result));
        setAddress({
          ...address,
          "address1": response.lookups[0].result[0].deliveryLine1,
          "address2": response.lookups[0].result[0].deliveryLine2 || "",
          "city": response.lookups[0].result[0].components.cityName,
          "state": response.lookups[0].result[0].components.state,
          "zip": response.lookups[0].result[0].components.zipCode,
          "zipPlus4": response.lookups[0].result[0].components.plus4Code,
        })

        const msg = (
            <>
            <p>
                {response.lookups[0].result[0].deliveryLine1}
                {response.lookups[0].result[0].deliveryLine2}
            </p>
            <p>
                {response.lookups[0].result[0].components.cityName}, {response.lookups[0].result[0].components.state} {" "} {response.lookups[0].result[0].components.zipCode}-{response.lookups[0].result[0].components.plus4Code}
            </p>
            </>
        )
        setAddressMessage(msg)
        setAddressModal(true)
      }
    
      function handleError(response) {
        setAddressMessage(response)
        setAddressModal(true)
      }

    async function handleVerifyAddress() {                    
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        let newForm = null
        console.log('handleVerifyAddress - prop.form.businessAddress.Id', prop.form.businessAddressId)
        if (!prop.form.businessAddressId) {
            //create the new address and add the id to the form
            const apiAddressData = await API.graphql(
                { query: createAddressMutation, 
                    variables: { 
                        input: {                    
                            userId: prop.form.userId,
                            addressType: "Business",
                            address1: address.address1,
                            address2: address.address2,
                            city: address.city,
                            state: address.state,
                            zip: address.zip,
                            zipPlus4: address.zipPlus4,
                            county: address.county,
                            country: address.country,
                        } 
                    } 
                }
            )

            const newAddressId = apiAddressData.data.createAddress.id
            console.log('handleNextClick - newAddressId', newAddressId)

            newForm = { 
                ...form, 
                businessAddressId: newAddressId,
                screenNavigation: screenNavigation.join(','),
                percentComplete: percentComplete,
            }
        } else {
            //update the address
            dispatch(updateAddressAsync(address))

            //update the form
            newForm = { 
                ...form, 
                screenNavigation: screenNavigation.join(','),
                percentComplete: percentComplete,
            }
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
    const verifyLength = value => {        
        if (value.length > 3) {
        return true;
        }
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;
        setAddress({ ...address, [id]: value})
    }

    function handleSelectState(e) {
        setAddress({...address, state: e.target.innerText})
        setIsDirty(true)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form"> 
                <FormGroup className={address1State === "success" ? "has-success" : null}>
                    <Label for="address1" className="control-label">Address Line 1</Label>
                    <Input 
                    type="text" 
                    name="address1" 
                    id="address1" 
                    defaultValue={address.address1}
                    onChange = {event => {
                        if (verifyLength(event.target.value)) {
                            setAddress1State("success");
                        } else {
                            setAddress1State("error");
                        }
                        handleChange(event)
                        }
                    }
                    />         
                </FormGroup> 
                <FormGroup>
                    <Label for="address2" className="control-label">Address Line 2</Label>
                    <Input 
                    type="text" 
                    name="address2" 
                    id="address2" 
                    defaultValue={address.address2}
                    onChange = {event => handleChange(event)}
                    />         
                </FormGroup>  

                <Row>
                    <Col md="6">
                    <FormGroup className={cityState === "success" ? "has-success" : null}>
                        <Label for="city" className="control-label">City</Label>
                        <Input 
                        type="text" 
                        name="city" 
                        id="city" 
                        defaultValue={address.city}
                        onChange = {event => {
                            if (verifyLength(event.target.value)) {
                                setCityState("success");
                            } else {
                                setCityState("error");
                            }
                            handleChange(event)
                            }
                        }
                        />         
                    </FormGroup> 

                    </Col>
                    <Col md="6">
                    <Label for="state" className="control-label">State</Label>
                        


                        <UncontrolledDropdown>
                            <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            color="primary"
                            data-toggle="dropdown"
                            id="stateDropdown"
                            type="button"
                            >
                            {address.state === "" ? ("State") : (address.state)}
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="stateDropdown">
                            {usStates.map(usState => (
                            <DropdownItem key={usState} href="#" onClick={handleSelectState}>
                                {usState}
                            </DropdownItem>
                            ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">

                <FormGroup>
                        <Label for="zip" className="control-label">Zip Code</Label>
                        <Input 
                        type="text" 
                        name="zip" 
                        id="zip" 
                        defaultValue={address.zip}
                        onChange = {event => {
                            if (verifyLength(event.target.value)) {
                                setZipState("success");
                            } else {
                                setZipState("error");
                            }
                            handleChange(event)
                            }
                        }
                        />         
                    </FormGroup>  
                    </Col>
                </Row>
                
            </Form>

            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
        <Modal isOpen={addressModal} toggle={() => setAddressModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Address Verification Service
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setAddressModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          {addressMessage}
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={() => setAddressModal(false)}
            >
              Make Changes
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="primary"
              type="button"
              onClick={handleVerifyAddress}
            >
              Looks Good
            </Button>
          </div>
        </div>
      </Modal>
    </div> 
    
  );
}

export default ProfileBusinessAddress;
