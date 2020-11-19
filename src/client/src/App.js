import React                              from 'react';
import logo                               from './logo.svg';
import Login                              from './containers/Login';
import Register                           from './containers/Register';
import Home                               from './containers/Home';
import ForgetPassword                     from './containers/ForgetPassword';
import PatientDashboard                   from './containers/PatientDashboard';
import loginTest                          from './containers/loginTest';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/login" component = { Login }/>
        <Route path = "/register" component = { Register } />
        <Route path = "/loginTest" component = { loginTest } />
        <Route path = "/forgetPassword" component = { ForgetPassword } />
        <Route path = "/patientDashboard" component = { PatientDashboard } />
        <Route path = "/" component = { Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
