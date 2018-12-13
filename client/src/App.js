import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import {clearCurrentProfile} from './actions/profileActions'

import ProtectedRoute from './components/common/ProtectedRoute'

import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
// Check for token
if(localStorage.jwtToken){
  // Set the authToken
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info
  const decode = jwt_decode(localStorage.jwtToken)
  // Set user and is auth
  store.dispatch(setCurrentUser(decode))

  // Check expired token
  const currentTime = Date.now() / 1000;
  if(decode.exp < currentTime){
    store.dispatch(logoutUser());

    
    // Clear the current profile
    store.dispatch(clearCurrentProfile());

    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Navbar/>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/developers" component={Profiles}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Switch>
                <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
              </Switch>
              <Switch>
                <ProtectedRoute exact path="/create-profile" component={CreateProfile}></ProtectedRoute>
              </Switch>
              <Switch>
                <ProtectedRoute exact path="/edit-profile" component={EditProfile}></ProtectedRoute>
              </Switch>
              <Switch>
                <ProtectedRoute exact path="/add-experience" component={AddExperience}></ProtectedRoute>
              </Switch>
              <Switch>
                <ProtectedRoute exact path="/add-education" component={AddEducation}></ProtectedRoute>
              </Switch>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
