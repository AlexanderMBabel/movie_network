import React from 'react';

const PasswordRecover = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="login-form container flex-row border-gray-800 w-1/5 p-4 shadow rounded-sm m-10 items-center justify-center">
          <div className="text-gray-900 text-xl text-center">Password Recovery</div>
          <div className="flex-row items-center justify-center text-center mt-4">
            <label className="text-gray-700 font-semibold text-sm text-center">Enter Your Email Address</label>
            <input className="p-2 m-2 shadow-md rounded-sm w-full"></input>
          </div>

          <div className="flex items-center justify-center m-4">
            <button className="p-2 m-4 w-1/3  text-white rounded shadow-md bg-teal-500 text-center hover:bg-teal-300">Recover</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecover;
