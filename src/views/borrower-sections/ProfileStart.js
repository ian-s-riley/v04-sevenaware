import React, {useState, useEffect} from "react";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm } from '../../graphql/queries';
import { createForm as createFormMutation } from '../../graphql/mutations';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateForm,
  updateFormAsync,  
} from 'features/form/formSlice'
import {
  updateNavigation,
  selectNavigation,
} from 'features/form/navigationSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function ProfileStart(prop) {
    const dispatch = useDispatch()

    const [navigation, setNavigation] = useState(useSelector(selectNavigation))
    const userId = navigation.userId
    const [screenNavigation, setScreenNavigation] = useState(navigation.screenNavigation)
    
    const [form, setForm] = useState(prop.form)
    const [formId, setFormId] = useState(prop.form.formId)
    const [isDirty, setIsDirty] = useState(false)

    const thisScreenId = "ProfileStart"
    let nextScreenId = "Profile>Email"
    let percentComplete = 22

    useEffect(() => {
        fetchForm()
    }, [formId])

    async function fetchForm() {
        //get this user's form/application from the DB
        if (formId) {
          const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId } });
          const thisForm = formFromAPI.data.getForm
          //console.log('Borrower.js fetchForm: thisForm', thisForm)
    
          // //set the redux store
          dispatch(updateForm(thisForm))
    
          // //set the local store
          setForm(thisForm)
    
          //get the navigation path for this form
          const newScreenNavigation = thisForm.screenNavigation.split(',')
          const newNav = {
            ...navigation,
            screenNavigation: newScreenNavigation
          }
          dispatch(updateNavigation(newNav))
          setScreenNavigation(newScreenNavigation)
          // newScreenNavigation.map(screen => {
          //   console.log('screen', screen)
          // })
        } else {
          //create a new form for this user using the data entered
          console.log('ProfileStart.js - formId', formId)
          console.log('ProfileStart.js - form', form)

          //clear the navigation stack so far
          
          // const newForm = {
          //   ...form, 
          //   userId: userId,
          //   screenNavigation: ["Start"]       
          // }
          // //console.log('fetchForm: newForm', newForm) 
          // dispatch(createFormAsync(newForm))
        }
      }

    const handleNextClick = () => {   
        //validation

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

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">
                <label></label>
                <hr />
                <div className="text-center">
                    <Button
                        onClick={handleBackClick}
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="sm"
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
                        size="sm"
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
    </div>
  );
}

export default ProfileStart;
