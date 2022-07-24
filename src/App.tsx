import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { AuthContext } from "./context/AuthContext";
import React, { useContext, useRef } from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import { theme } from './service/theme';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const sd = firebase.SDK_VERSION;


function App() {

  // const user = useContext(AuthContext);
  // // const provider = new GoogleAuthProvider();
  // var provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth()
  // .signInWithPopup(provider)
  // .then((result) => {
  //   /** @type {firebase.auth.OAuthCredential} */
  //   var credential = result.credential;

  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   // var token = credential?.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   console.log(`SUCCESS ${JSON.stringify(user)}`)
  //   // ...
  // }).catch((error) => {
  //   console.log(`ERROR ${error.message}`)
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
  
  return (
    <div className="LightTheme">
    <ThemeProvider theme={theme} >
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Toolbar />
          <Switch>
            <Route path='/game/:id' component={GamePage} />
            <Route path='/join/:id' component={HomePage} />
            <Route exact path='/*' component={HomePage} />
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
