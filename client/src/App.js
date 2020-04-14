import React from 'react';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import Landing from './components/landing/Landing';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="">
      <Navbar />

      <Switch>
        <Route extact path="/Signup" component={SignUp} />
        <Route extact path="/Login" component={Login} />
        <Route extact path="/Dashboard" component={Dashboard} />

        <Route extact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
