import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './containers/Authentication/Login';
import Register from './containers/Authentication/Register';
import Home from './containers/Authentication/Home';
import ForgetPassword from './containers/Authentication/ForgetPassword';
import ResetPassword from './containers/Authentication/ResetPassword';

import PatientDashboard from './containers/Dashboard/Patient/PatientDashboard';
import PractitionerDashboard from './containers/Dashboard/Practitioner/PractitionerDashboard';
import AdminDashboard from './containers/Dashboard/Admin/AdminDashboard';
import Error from '../src/components/Others/Error';

import './App.css';


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/forgetPassword" component={ForgetPassword}/>
                <Route path="/patient" component={PatientDashboard}/>
                <Route path="/practitioner" component={PractitionerDashboard}/>
                <Route path="/admin" component={AdminDashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <Route exact path="/" component={Home}/>
                <Route render={(props) => <Error code={404} mess='Not Found'/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
