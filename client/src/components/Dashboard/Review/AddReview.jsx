import React, { useLayoutEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidenav from '../Sidenav';
import TextEditor from '@bit/alexandermbabel.emn.text-editor'
import StarRating from '@bit/alexandermbabel.emn.star-rating'
import {addError} from '../../../actions/errors'
import Axios from 'axios';


const AddReview = ({ title, id, type, addError }) => {

  



  const [rating,setRating] = useState(0)

  

  let headers = {
    headers: {
      'x-auth-token': localStorage.token,
      'Content-Type': 'application/json'
    }
    
  }

  useLayoutEffect(() => {
     headers = {
      headers: {
        'x-auth-token': localStorage.token,
        'Content-Type': 'application/json'
      }
    }
  }, [localStorage.token])

  // Get rating via id
  useLayoutEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_HOST}/reviews?id=${id}`, headers).then(res => {
      console.log(res.data)
      
        setRating(res.data.rating)
      
    }).catch(err => {
      console.error(err.message)
    })

  }, [id])
  
  

  
  return (
    <div style={{ height: '92vh', width: '100%' }} className="flex">
      <Sidenav />
      <section className="flex items-center justify-center w-full">
        <div className='w-3/4 flex flex-wrap justify-center items-center'>
          
        <div className="w-full p-4 m-4 ">
          <p className='text-center font-semibold'>Reviewing {title}</p>
        </div>
        <div className='w-full flex justify-center items-center'>
          <div><StarRating rating={rating} setRating={setRating} /></div>
        </div>
        <div className='w-full'>
          <TextEditor getUrl={`${process.env.REACT_APP_SERVER_HOST}/reviews`} postUrl={`${process.env.REACT_APP_SERVER_HOST}/reviews`} headers={headers} more={{title, id, type, rating}} alertHandler={addError} />
        </div>
        </div>
        
      </section>
    </div>
  );
};

AddReview.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  addError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.search.id,
  type: state.search.type,
  title: state.search.title,

  
});

export default connect(mapStateToProps, {addError})(AddReview);
