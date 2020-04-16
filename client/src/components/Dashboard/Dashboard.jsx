import React from 'react';
import PropTypes from 'prop-types';
import Sidenav from './Sidenav';

const Dashboard = props => {
  return (
    <div style={{ height: '95vh' }} className="flex">
      <Sidenav />
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
