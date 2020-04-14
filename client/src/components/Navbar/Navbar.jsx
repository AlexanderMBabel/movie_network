import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div name="container" className="flex justify-between bg-teal-300 text-gray-700 p-4">
      <div name="links_left" className="flex">
        <div className="">Logo</div>
        <Link className="ml-2" to="/">
          MovieO
        </Link>
      </div>
      <div name="links_right" className="">
        <Link className="hover:text-white" to="/Login">
          Log In
        </Link>
        <Link className="ml-2 hover:text-white" to="/Signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
