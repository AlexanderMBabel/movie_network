import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';

const SignUp = ({ register }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]);

  const changeHandler = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'password2') {
      setPassword2(e.target.value);
    }
  };

  const validate = (email, password, password2) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) === false) {
      setErrors([...errors, 'invalid email address']);
      return false;
    }
    if (password !== password2) {
      setErrors([...errors, 'passwords dont match']);
      return false;
    }
    setErrors([]);
    return true;
  };

  const submitHandler = () => {
    if (validate(email, password, password2)) {
      register({ email, password });
    }
  };

  return (
    <div style={{ height: '90vh' }} className="w-full flex items-center justify-center">
      {}

      <div className="xl:w-1/6 lg:w-1/5 md:1/4 w-1/2 flex-row items-center p-3 justify-center container rounded shadow-md  ">
        <div className="text-center text-xl text-gray-900">
          <p>Sign Up</p>
        </div>
        <div className="p-2">
          {errors.map(error => (
            <div key={error} className="bg-red-500">
              {error}
            </div>
          ))}
        </div>
        <div className="flex-row justify-center items-center">
          <label className="font-semibold text-gray-700 text-sm">Email</label>
          <input id="email" name="email" onChange={changeHandler} value={email} className="shadow-md rounded p-2 w-full" />
        </div>
        <div className="flex-row justify-center items-center">
          <label htmlFor="password" className="font-semibold text-gray-700 text-sm">
            Password
          </label>
          <input id="password" name="password" onChange={changeHandler} value={password} className="shadow-md rounded p-2 w-full" />
        </div>
        <div className="flex-row justify-center items-center">
          <label htmlFor="password2" className="font-semibold text-gray-700 text-sm">
            Repeat Password
          </label>
          <input id="password2" name="password2" onChange={changeHandler} value={password2} className="shadow-md rounded p-2 w-full" />
        </div>
        <div className="flex items-center justify-center m-4">
          <button onClick={submitHandler} className="p-2 shadow text-white bg-teal-600 rounded hover:bg-teal-400">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  register: PropTypes.func.isRequired
};

export default connect(null, { register })(SignUp);
