import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ShowReview from './ShowReview';
import Sidenav from '../Sidenav';


const Reviews = ({reviews}) => {
  return <div style={{height: '92vh', width:'100%' }} className='flex'>
    <Sidenav />
    <div>
    {reviews.map(review => <ShowReview review={review.review} title={review.title} rating={review.rating} />)}
    </div>
    
  </div>;
};

Reviews.propTypes = {
  reviews: PropTypes.array,
}

const mapStateToProps = state => ({
  reviews: state.auth.reviews
})


export default connect(mapStateToProps,{})(Reviews);
