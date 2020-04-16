import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  const [display, setDisplay] = useState('full');
  return (
    <div style={{ height: '100%' }} className={`flex-row bg-gray-800 items-center justify-center text-white ${display === 'full' ? 'w-1/6 lg:w-1/12' : 'w-3'}`}>
      <div className="mt-4">
        <Link className="side_link lg:ml-2" to="/Dashboard/">
          Overview
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Profile">
          Profile
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Search">
          Search
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Favorites">
          Favorites
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Reviews">
          Reviews
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Messages">
          Messages
        </Link>
      </div>
      <div>
        <Link className="side_link lg:ml-2" to="/Dashboard/Lists">
          Lists
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
