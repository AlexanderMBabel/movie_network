import React, { useEffect } from 'react';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import Landing from './components/landing/Landing';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import PasswordRecover from './components/login/PasswordRecover';
import ProtectedRoute from './components/utils/ProtectedRoute';
import { connect } from 'react-redux';

import { loadUser } from './actions/auth';
import Profile from './components/Dashboard/Profile';
import Search from './components/Search/Search';
import Favorites from './components/Dashboard/Favorites';
import Reviews from './components/Dashboard/Review/Reviews';
import Messages from './components/Dashboard/Messages';
import Lists from './components/Dashboard/Lists';
import CreateProfile from './components/CreateProfile/CreateProfile';
import ResultInfo from './components/Search/ResultInfo';
import ShowErrors from './components/ShowErrors';
import AddReview from './components/Dashboard/Review/AddReview';

function App({ isAuthenticated, loadUser }) {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="baloo-font relative">
      <Navbar />
      {/* {isAuthenticated && <Redirect to="/Dashboard" />} */}
      <div className="">
        <ShowErrors />
      </div>

      <Switch>
        <Route extact path="/Signup" component={SignUp} />
        <Route extact path="/Forgot" component={PasswordRecover} />
        <Route extact path="/Login" component={Login} />
        <Route extact path="/createprofile" component={CreateProfile} />
        <ProtectedRoute extact path="/Dashboard/Lists" component={Lists} />
        <ProtectedRoute extact path="/Dashboard/Messages" component={Messages} />
        <ProtectedRoute extact path="/Dashboard/Reviews/Add" component={AddReview} />
        <ProtectedRoute extact path="/Dashboard/Reviews" component={Reviews} />
        <ProtectedRoute extact path="/Dashboard/Favorites" component={Favorites} />
        <ProtectedRoute extact path="/Dashboard/Search/More" component={ResultInfo} />
        <ProtectedRoute extact path="/Dashboard/Search" component={Search} />
        <ProtectedRoute extact path="/Dashboard/Profile" component={Profile} />
        <ProtectedRoute extact path="/Dashboard" component={Dashboard} />

        <Route extact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(App);
