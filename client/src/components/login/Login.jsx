import React from 'react';
import PropTypes from 'prop-types';

const Login = props => {
  return (
    <div className="flex justify-center items-center">
      <div className="login-form container flex-row border-gray-800 w-1/5 p-4 shadow rounded-sm m-10 items-center justify-center">
        <div className="text-gray-900 text-xl text-center">Login</div>
        <div>
          <label className="text-gray-700 font-semibold text-sm">Username</label>
          <input className="p-2 shadow-md rounded-sm w-full"></input>
        </div>
        <div>
          <label className=" text-gray-700 font-semibold text-sm">Password</label>
          <input className="p-2 shadow-md rounded-sm w-full"></input>
        </div>
        <div className="flex items-center justify-center m-4">
          <button className="p-2 w-1/3  text-white rounded shadow-md bg-teal-500 text-center hover:bg-teal-300">Login</button>
          <div className="w-1/3"></div>
          <p className="italic text-xs mt-4 text-center w-1/3">Forgot Password ?</p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;