import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import ForgetPassword from './routes/ForgetPassword';
import ResetPassword from './routes/ResetPassword';
import Account from "./routes/Account";

import PatientDashboard from './routes/Dashboard/Patient/PatientDashboard';
import PractitionerDashboard from './routes/Dashboard/Practitioner/PractitionerDashboard';
import AdminDashboard from './routes/Dashboard/Admin/AdminDashboard';
import Error from '../src/components/Others/Error';

import './App.css';
import UserDashboard from "./routes/Dashboard/UserDashboard";
import MedicalServices from "./routes/MedicalServices";


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
                <Route path="/account" component={Account}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <Route path="/medical-services" component={MedicalServices}/>
                <Route exact path="/" component={Home}/>
                <Route render={(props) => <Error code={404} mess='Not Found'/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
