/*eslint-disable*/
import React, { useState, useEffect } from "react";
//amplify authentication
import { Auth } from 'aws-amplify'

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listForms } from '../graphql/queries';

// redux store
import { useDispatch } from 'react-redux';
import {
  updateForm,
} from 'features/form/formSlice'

import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

// core components
import BorrowerNavBar from "components/Navbars/BorrowerNavBar.js";
import BorrowerHeader from "components/Headers/BorrowerHeader.js";
import FooterBorrower from "components/Footers/FooterGray.js";
import Dashboard from "../views/Dashboard";
import Application from "../views/Application";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

function Borrower() {
  const dispatch = useDispatch()    
    
  const [form, setForm] = useState()
  const [showForm, setShowForm] = useState(false)
  const [userId, setUserId] = useState()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
        const thisUser = await Auth.currentAuthenticatedUser()        
        setUserId(thisUser.username)
        //console.log('checkuser - user signed in - thisUser:', thisUser.username)
      } catch (error) {
          console.log('checkUser - error signing in:', error)
      }               
  }

  useEffect(() => {
      fetchForm()
  }, [userId])

  async function fetchForm() {
      //get this user's form/application from the DB      
      if (userId) {
        const formFromAPI = await API.graphql(graphqlOperation(listForms, {
          filter: { userId: { eq: userId }},
        }))  
        const thisForm = formFromAPI.data.listForms.items[0]
        //console.log('Borrower.js fetchForm: thisForm', thisForm)

        //set the redux store
        dispatch(updateForm(thisForm))

        //set the local store
        setForm(thisForm)
      }
    }

    function handleShowForm() {
      setShowForm(true)
    }


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
    };
  });

  return (
    <>
      <BorrowerNavBar />
      <div className="wrapper">
        <BorrowerHeader />    
        {form && (
          showForm ? (
            <Application form={form} />                            
          ) : (
            <Dashboard showForm={handleShowForm} form={form} />                            
          )
        )}        
      </div>
      <FooterBorrower />
    </>
  );
}

export default Borrower;
