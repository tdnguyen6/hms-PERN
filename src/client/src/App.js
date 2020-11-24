import React                              from 'react';
import logo                               from './logo.svg';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';

import Login                              from './containers/Authentication/Login';
import Register                           from './containers/Authentication/Register';
import Home                               from './containers/Authentication/Home';
import ForgetPassword                     from './containers/Authentication/ForgetPassword';

import PatientDashboard                   from './containers/Dashboard/Patient/PatientDashboard';
import PractitionerDashboard              from './containers/Dashboard/Practitioner/PractitionerDashboard';
import AdminDashboard                     from './containers/Dashboard/Admin/AdminDashboard';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/login"                          component = { Login }/>
        <Route path = "/register"                       component = { Register } />
        <Route path = "/forgetPassword"                 component = { ForgetPassword } />
        <Route path = "/patientDashboard"               component = { PatientDashboard } />
        <Route path = "/practitionerDashboard"          component = { PractitionerDashboard } />
        <Route path = "/dashboard"                      component = { AdminDashboard } />
        <Route path = "/"                               component = { Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
