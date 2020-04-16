import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const changeHandler = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const submitHandler = e => {
    props.login({ email, password });
    if (props.isAuthenticated) {
      props.history.push('/Dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="login-form container flex-row border-gray-800 w-1/5 p-4 shadow rounded-sm m-10 items-center justify-center">
        <div className="text-gray-900 text-xl text-center">Login</div>
        <div>
          <label className="text-gray-700 font-semibold text-sm">email</label>
          <input name="email" onChange={changeHandler} value={email} className="p-2 shadow-md rounded-sm w-full"></input>
        </div>
        <div>
          <label className=" text-gray-700 font-semibold text-sm">Password</label>
          <input name="password" onChange={changeHandler} value={password} className="p-2 shadow-md rounded-sm w-full"></input>
        </div>
        <div className="flex items-center justify-center m-4">
          <button onClick={submitHandler} className="p-2 w-1/3  text-white rounded shadow-md bg-teal-500 text-center hover:bg-teal-300">
            Login
          </button>
          <div className="w-1/3"></div>
          <Link to="/Forgot" className="italic text-xs mt-4 text-center w-1/3 hover:text-teal-400">
            Forgot Password ?
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-gray-900 text-md">
            Not a member?
            <Link className="hover:text-teal-300 text-teal-600 ml-2" to="/Signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
