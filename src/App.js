/*!

=========================================================
* Paper Kit PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-pro-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from './app/store';
import { Provider } from 'react-redux';

//amplify authentication
import { Auth, Hub } from 'aws-amplify'

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// pages
import Error404 from "views/examples/Error404.js";
// others
import CustomAuth from "views/CustomAuth.js"
import Borrower from "views/Borrower.js";
import Opportunity from "views/Opportunity.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
        setIsAuthenticated(true)
         //checkUser()
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
        setIsAuthenticated(false)
         //checkUser()
       }
    })
  }, [])

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
        const thisUser = await Auth.currentAuthenticatedUser().then(
        setIsAuthenticated(true))
      } catch (error) {
          console.log('checkUser - error signing in:', error)
          setIsAuthenticated(false)
      }               
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isAuthenticated ? (
        <Switch>
          <Route
            path="/borrower"
            render={(props) => <Borrower {...props} />}
          />
          <Route path="/error-404" render={(props) => <Error404 {...props} />} />
          <Redirect to="/borrower" />
        </Switch>
        ) : (
        <Switch>
          <Route
            path="/opportunity"
            render={(props) => <Opportunity {...props} />}
          />
          <Route 
            path="/auth" 
            render={(props) => <CustomAuth {...props} />} 
          />
          <Route path="/error-404" render={(props) => <Error404 {...props} />} />
          <Redirect to="/opportunity" />
        </Switch>
        )}  
      </BrowserRouter>
    </Provider>
  )
}

export default App;


