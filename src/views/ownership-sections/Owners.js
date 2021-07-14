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
import {
  createNotificationAsync,  
} from 'features/notification/notificationSlice'

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

// import { PinpointClient, CreateAppCommand } from "@aws-sdk/client-pinpoint";

// // a client can be shared by different commands.
// const client = new PinpointClient({ region: "us-east-1" });

// const params = {
//   /** input parameters */
// };
// const command = new CreateAppCommand(params);

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');

// // The AWS Region that you want to use to send the email. For a list of
// // AWS Regions where the Amazon Pinpoint API is available, see
// // https://docs.aws.amazon.com/pinpoint/latest/apireference/
// const aws_region = "us-east-1"

// // The "From" address. This address has to be verified in Amazon Pinpoint
// // in the region that you use to send email.
// const senderAddress = "sender@example.com";

// // The address on the "To" line. If your Amazon Pinpoint account is in
// // the sandbox, this address also has to be verified.
// var toAddress = "recipient@example.com";

// // The Amazon Pinpoint project/application ID to use when you send this message.
// // Make sure that the SMS channel is enabled for the project or application
// // that you choose.
// const appId = "ce796be37f32f178af652b26eexample";

// // The subject line of the email.
// var subject = "Amazon Pinpoint (AWS SDK for JavaScript in Node.js)";

// // The email body for recipients with non-HTML email clients.
// var body_text = `Amazon Pinpoint Test (SDK for JavaScript in Node.js)
// ----------------------------------------------------
// This email was sent with Amazon Pinpoint using the AWS SDK for JavaScript in Node.js.
// For more information, see https:\/\/aws.amazon.com/sdk-for-node-js/`;

// // The body of the email for recipients whose email clients support HTML content.
// var body_html = `<html>
// <head></head>
// <body>
//   <h1>Amazon Pinpoint Test (SDK for JavaScript in Node.js)</h1>
//   <p>This email was sent with
//     <a href='https://aws.amazon.com/pinpoint/'>the Amazon Pinpoint API</a> using the
//     <a href='https://aws.amazon.com/sdk-for-node-js/'>
//       AWS SDK for JavaScript in Node.js</a>.</p>
// </body>
// </html>`;

// // The character encoding the you want to use for the subject line and
// // message body of the email.
// var charset = "UTF-8";

// // Specify that you're using a shared credentials file.
// //var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
// //AWS.config.credentials = credentials;

// // Specify the region.
// AWS.config.update({region:aws_region});

// const awsCreds = new BasicAWSCredentials("access_key_id", "secret_key_id");
// AWS.AmazonS3ClientBuilder.standard()
//                         .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
//                         .build();

//AWS.config.AWSStaticCredentialsProvider()
// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

//Create a new Pinpoint object.
//var pinpoint = new AWS.Pinpoint();

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
  percentOwner: null,
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
    const [ownerModal, setOwnerModal] = React.useState(false);
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

    useEffect(() => {
      const newTotal = owners.reduce((a,v) =>  a = a + parseFloat(v.percentOwner) , 0 )
      console.log('useEffect - newTotal', newTotal)
      setTotalPercent(newTotal)
    }, [owners])

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
      if (emailState !== "success" || percentState !== "success" || user.email === "" || user.percentOwner === "") {
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

    //send an email to the new owner
    //send a notification to the new user/borrower
    const toUserId = user.email
    const fromUserId = "ian.s.riley@outlook.com"
    const fromName = "7(a)ware"
    const title = "Welcome to 7(a)ware"
    const emailBody = "<p>Welcome to <b>7(a)ware</b>. You've been added as a " + user.percentOwner + "% owner of " + form.businessName + ".<br /><br/>Pleaes sign up on the <a href='www.7aware.com'>7(a)ware SBA loan application owner portal</a> to complete your profile."
    const borrowerNotification = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        fromEmail: fromUserId,
        toEmail: toUserId,
        fromName: fromName,
        toName: toUserId,
        title: title,
        body: emailBody,
        emailBody: emailBody,
    } 
    dispatch(createNotificationAsync(borrowerNotification))
    
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
    console.log('verifyPercent - totalPercent:', totalPercent)
    console.log('verifyPercent - value:', value)
    if (value < 0) {return false}
    if (100 - totalPercent - value < 0) {return false}

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
                  {totalPercent < 100.00 && (
                  <tr className="d-flex">
                    <td className="text-center col-7">
                      <FormGroup>
                      <InputGroup className={emailState === "success" ? "has-success" : null}>
                          <Input 
                          type="email" 
                          defaultValue={user.email}
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
                          defaultValue={user.percentOwner}
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
                  )}
                  

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
                          onClick={() => setOwnerModal(true)}
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
                    <h5>{totalPercent}%</h5>
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

      <Modal
        isOpen={ownerModal}
        toggle={() => setOwnerModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setOwnerModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <br />
          <h3 className="modal-title text-center">You own</h3>
          <p>{user.percentOwner}% of this business.</p>
        </div>
        <div className="modal-body">
          
          <p>
            As the owner fills out their profile you'll see updates here 
          </p>          
          <br />
          <div className="text-center">
          <Button className="btn-round" color="primary">
            Resend Invitation
          </Button>
          </div>          
        </div>
      </Modal>
    </div>

  );
}

export default Owners;
