import React from 'react';
import Sidenav from './Sidenav';

const Lists = () => {
  return <div style={{height: '92vh', width: '100%'}} className='flex'>
    <Sidenav />
    <div className='flex items-center justify-center'>
      <div className='flex w-5/6 rounded shadow m-6 p-6 items-center justify-center' style={{ overflowY: 'scroll'}}>
        <div className='w-full text-center'>My Lists</div>
        <div></div>
        <div className='w-full text-center'>Favorited Lists</div>
        <div></div>
        <div className='w-full text-center'>Friends Lists</div>
      </div>

    </div>
  </div>;
};

export default Lists;
