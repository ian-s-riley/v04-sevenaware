import React, {useState, useEffect} from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, getUser } from '../../graphql/queries';
import { 
    createUser as createUserMutation, deleteUser as deleteUserMutation,
} from '../../graphql/mutations';

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

// reactstrap components
import {
  Button,
  Form,
  FormGroup,
  Container,
  Row,
  Col,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledTooltip,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Modal,
  scrollingLongContent,
} from "reactstrap";
import { formatDiagnostic } from "typescript";

// core components
import Buttons from "../opportunity-sections/Buttons";

const initialUserState = {
  id: "",
  userId: "",
  formId: "",
  userType: "",
  email: "",
  password: "",
  preifx: "",
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  addressId: "",
  title: "",
  profile: "",
  image: "",
  tin: "",
  ssn: "",
  idType: "SSN",
  percentOwner: 0,
  sevenAwareAgree: false,
}

function Owners(prop) {
    const dispatch = useDispatch()

    const [form, setForm] = useState(prop.form)
    const [owners, setOwners] = useState([])
    const [user, setUser] = useState(initialUserState) 
    const [percentState, setPercentState] = useState("");  
    const [totalPercent, setTotalPercent] = useState(0);  
    const [emailState, setEmailState] = useState("");  
    const [newOwnerModal, setNewOwnerModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    //const thisScreenId = "Ownership>Owners"
    let nextScreenId = "Ownership>Associates"        

    useEffect(() => {
        fetchOwners()
    }, [form])

    async function fetchOwners() {
      //get this user's form/application from the DB      
      if (form.id) {
        const ownersFromAPI = await API.graphql(graphqlOperation(listUsers, {
          filter: { formId: { eq: form.id }},
        }))  
        const owners = ownersFromAPI.data.listUsers.items
        setOwners(owners)
      }
    }

    const handleNextClick = () => {   
       //validation
         
        // //save the new form to the navigation path for this user    
        // let screenNavigation = Object.assign([], prop.navigation);
        // screenNavigation.push(nextScreenId)

        // let newForm = null
        // if (isDirty) {
        //     //update the local form store 
        //     newForm = { 
        //         ...form, 
        //         screenNavigation: screenNavigation.join(','),
        //     }

        //     //update redux & graphql
        //     dispatch(updateFormAsync(newForm))

        //     //send a notification            
        // }

        // //go to the next step, stage, or form
        // prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
      let screenNavigation = Object.assign([], prop.navigation);
      screenNavigation.pop()
      prop.nextForm(null, screenNavigation)
    }

    function handleNewOwner() {   
      //validation
      if (emailState === "error" || percentState === "error" || user.email === "" || user.percentOwner === "") {
        setErrorMessage("Please make sure that the email address is correct and that the percent ownership is between 0 & 100%.")
        return false;
      } else {
        setNewOwnerModal(true)      
      }      
    }

   async function handleAddOwner() {      
      //create the new owner for this application/form/business
      const apiUserData = await API.graphql(
        { query: createUserMutation, 
            variables: { 
                input: {                    
                    userId: user.email,
                    formId: prop.form.id,
                    userType: "Owner",
                    email: user.email,
                    password: "",
                    preifx: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    suffix: "",
                    addressId: "",
                    title: "",
                    profile: "",
                    image: "",
                    tin: "",
                    ssn: "",
                    idType: "SSN",
                    percentOwner: user.percentOwner,
                    sevenAwareAgree: false,
                    status: "Sending Notification"
                } 
            } 
        }
      )
    const newUserId = apiUserData.data.createUser.id
    
    //add the new user to the local store for display
    setOwners([...owners, {...user, "id": newUserId}]);

    //clear the form
    setUser(initialUserState)

    //close the modal
    setNewOwnerModal(false)
  }

  async function handleDeleteOwner(userId) {      
    console.log('handleDeleteOwner - id', userId)
    await API.graphql(graphqlOperation(deleteUserMutation, {
      input: { id: userId} 
    }))  
    const ownersFiltered = owners.filter(owner => owner.id !== userId)
    setOwners(ownersFiltered)
  }

  const verifyEmail = value => {        
      var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(value) && value.length > 0) {
      return true;
      }
      return false;
  }

  const verifyPercent = value => {         
    console.log('verifyPercent - value:', value)
    if (value < 0 || value > 100.00) {return false}

    var percentRex = /^((\d{0,2}(\.\d{1,2})?)|100)$/;
    if (percentRex.test(value)) {      
      return true;
    }
    
    return false;
  };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
            <Col className="justify-content-center" md="8">


            <Table responsive>
                <thead>
                <tr className="d-flex">       
                    <th className="text-center col-7">Email</th>
                    <th className="text-center col-3">Ownership</th>
                    <th className="text-right col-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="d-flex">
                    <td className="text-center col-7">
                      <FormGroup>
                      <InputGroup className={emailState === "success" ? "has-success" : null}>
                          <Input 
                          type="email" 
                          value={user.email}
                          onChange = {event => {
                          if (verifyEmail(event.target.value)) {
                              setEmailState("success");
                          } else {
                              setEmailState("error");
                          }
                          setUser({...user, "email": event.target.value})
                          }}
                          />         
                          <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fa fa-envelope-o" />
                          </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        </FormGroup>
                      </td>
                      <td className="text-center col-3">
                      <FormGroup>
                      <InputGroup className={percentState === "success" ? "has-success" : null}>
                      <Input 
                          type="text"  
                          onChange = {event => {
                          if (verifyPercent(event.target.value)) {
                              setPercentState("success");
                          } else {
                              setPercentState("error");
                          }
                          setUser({...user, "percentOwner": event.target.value})
                          }}               
                      />       
                      <InputGroupAddon addonType="append">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      </FormGroup>
                      </td>
                      <td className="td-actions text-right col-2">
                        
                        <Button
                          className="btn-link"
                          color="success"
                          data-toggle="tooltip"
                          id="tooltip16493123"
                          size="sm"
                          type="button"
                          onClick={handleNewOwner}
                        >
                          <i className="fa fa-2x fa-plus" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip16493123"
                        >
                          Add Owner 
                        </UncontrolledTooltip>
                      </td>
                    </tr>

                  {owners.map((owner, key) => {
                    return (
                      <tr className="d-flex" key={key}>
                    <td className="text-left col-6">
                      <h5>{owner.email}</h5>
                      </td>
                      <td className="text-center col-3">
                        <h5>{owner.percentOwner}%</h5>
                      </td>
                      <td className="td-actions text-right col-3">
                        
                        <Button
                          className="btn-link"
                          color="info"
                          data-toggle="tooltip"
                          id="tooltip164934787"
                          size="sm"
                          type="button"
                          onClick={() => setNewOwnerModal(true)}
                        >
                          <i className="fa fa-user" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip164934787"
                        >
                          View/Update/Notify Owner 
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link"
                          color="danger"
                          data-toggle="tooltip"
                          id="tooltip164934788"
                          size="sm"
                          type="button"
                          onClick={() => handleDeleteOwner(owner.id)}
                        >
                          <i className="fa fa-times" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip164934788"
                        >
                          Delete/Remove Owner 
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    )
                  })
                  }

                  <tr className="d-flex">       
                    <td className="text-center col-7"></td>
                    <td className="text-center col-3">
                    <h5>{(owners.reduce((a,v) =>  a = a + v.percentOwner , 0 ))}%</h5>
                    </td>
                    <td className="text-right col-2"></td>
                  </tr>
                  
                </tbody>
                
              </Table>
          
            </Col>
              
            <Col className="d-flex align-items-center justify-content-center" md="2">
            <Buttons next={handleNextClick} back={handleBackClick}/>
            </Col>
        </Row>
        </Container>
        <Modal
        isOpen={newOwnerModal}
        toggle={() => setNewOwnerModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setNewOwnerModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <br />
          <h3 className="modal-title text-center">Lorem Ipsum</h3>
          <p>owns {user.percentOwner}% of this business.</p>
        </div>
        <div className="modal-body">
          
          <p>
            We'll send an email notification to this {"owner"} at <b>{user.email}</b> and invite them to the 7(a)ware application to securely complete their profile. 
          </p>          
          <br />
          <div className="text-center">
          <Button className="btn-round" color="primary" onClick={() => handleAddOwner()}>
            Save & Send
          </Button>
          </div>          
        </div>
        <div className="modal-footer no-border-footer mr-5 ml-5">
          <span className="text-muted text-center">
            After sending you can continue adding any others until 100% of the owners are listed.
          </span>
        </div>
      </Modal>

      <Modal isOpen={errorMessage !== ""} toggle={() => setErrorMessage("")}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Incorrect {"something"}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setErrorMessage("")}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>It looks like you have not entered a valid {"something"}</p>          
        </div>
      </Modal>
    </div>

  );
}

export default Owners;
