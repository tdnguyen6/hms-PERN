import React                              from 'react';
import logo                               from './logo.svg';
import Login                              from './components/Login/Login';
import Register                           from './components/Register/Register';
import Home                               from './components/Home/Home';
import loginTest                          from './components/Test/loginTest';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/login" component = { Login }/>
        <Route path = "/register" component = { Register } />
        <Route path = "/loginTest" component = { loginTest } />
        <Route path = "/" component = { Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
