import React from 'react'
import {connect} from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import DisplayStarRating from '@bit/alexandermbabel.emn.display-star-rating'
import history from '../../../history'
import {selectedResult} from '../../../actions/search'
import Axios from 'axios'
import {addError} from '../../../actions/errors'

const ShowReview = ({review, title, id, rating, image, selectedResult, addError}) => {
    const reviewHTML = draftToHtml(JSON.parse(review))
    const editHandler = () => {
        selectedResult('movie', id)
        history.push('/Dashboard/Reviews/Add')

    }
    const removeHandler = () => {
        Axios.delete(`${process.env.REACT_APP_SERVER_HOST}/reviews`, {title}, {headers: {
            'x-auth-token': localStorage.token
        }}).then(res => {
            addError({alert:`${title}review removed`, type: 'success'})
        }).catch(err => {
            console.error(err.message)
            addError({alert: 'Could not remove review', type: 'error'})
        })
    }
    return (
        <div className='w-3/4 rounded shadow p-4 m-4 flex flex-wrap items-center justify-center'>
            <div className='w-full font-semibold p-6'>{title}</div>
            <div className='w-full flex items-center justify-center'><DisplayStarRating rating={rating} /></div>
            <div className="w-full">
                {console.log(reviewHTML)}
                <div className='p-2' dangerouslySetInnerHTML={{__html: reviewHTML}}></div>
            </div>
            <div className='w-full flex justify-between'>
                <button onClick={editHandler} className="rounded shadow p-2 m-4 bg-teal-700 text-gray-100 hover:bg-teal-600">Edit</button>
                <button onClick={removeHandler} className='rounded shadow p-2 m-4 bg-teal-700 test-gray-100 hover:bg-teal-600'>Remove</button>
            </div>
            
        </div>
    )
}

export default connect(null, {selectedResult, addError})(ShowReview)
