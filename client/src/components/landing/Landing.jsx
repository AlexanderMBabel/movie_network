import React from 'react';
import PropTypes from 'prop-types';


const Landing = props => {
  return (
    <div>
      <div style={{ height: '100vh' }} className="flex items-center justify-center ">
        <div className=" rounded shandow p-4">
          <div className="text-center text-2xl m-10">Moive..O is a film centric social network </div>
          <div className="flex m-4 ">
            <div className="w-1/5 shadow rounded bg-orange-400 p-10 m-4">Up to date film information</div>
            <div className="w-1/5 shadow rounded bg-red-400 p-10 m-4">Film discussion</div>
            <div className="w-1/5 shadow rounded bg-teal-400 p-10 m-4">Film Reviews and sumaries</div>
            <div className="w-1/5 shadow rounded bg-pink-400 p-10 m-4">Film lists, Blogs, Videos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
