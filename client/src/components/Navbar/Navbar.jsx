import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <div name="container" className="flex justify-between bg-teal-300 text-gray-700 p-4">
      <div name="links_left" className="flex">
        <div className="">Logo</div>
        <Link className="ml-2" to="/">
          MovieO
        </Link>
      </div>
      {!isAuthenticated && (
        <div name="links_right" className="">
          <Link className="hover:text-white" to="/Login">
            Log In
          </Link>
          <Link className="ml-2 hover:text-white" to="/Signup">
            Sign Up
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div name="links_right" className="flex">
          <Link className="hover:text-white" to="/Dashboard">
            Dashboard
          </Link>
          <div
            className="hover:text-white ml-2"
            onClick={() => {
              logout();
            }}
          >
            logout
          </div>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
