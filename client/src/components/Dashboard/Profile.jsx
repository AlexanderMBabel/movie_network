import React from 'react';
import Sidenav from './Sidenav';
import CreateProfile from '../CreateProfile/CreateProfile';

const Profile = () => {
  return <div style={{height: '92vh', width: '100%'}} className='flex'>
    <Sidenav />
    <div>
      <CreateProfile />
    </div>
  </div>;
};

export default Profile;
