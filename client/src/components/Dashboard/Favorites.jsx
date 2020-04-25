import React, { useState, useEffect, useLayoutEffect } from 'react';
import Sidenav from './Sidenav';
import { connect } from 'react-redux';
import Axios from 'axios';
import { addError } from '../../actions/errors';
import { MdDelete, MdNoteAdd, MdMore, MdRateReview } from 'react-icons/md';
import { removeFav } from '../../actions/favorite';
import history from '../../history';
import { selectedResult } from '../../actions/search';
import PropTypes from 'prop-types';

const Favorites = ({ addError, removeFav, selectedResult }) => {
  const [allFavs, setAllFavs] = useState([]);
  const [highlightInfo, setHighlightInfo] = useState('');
  const [removedId, setRemovedId] = useState('');

  useLayoutEffect(() => {
    const config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };
    Axios.get(`${process.env.REACT_APP_SERVER_HOST}/favorites`, config)
      .then(res => {
        setAllFavs(res.data);
      })
      .catch(err => {});
    return () => {};
  }, [removedId]);

  return (
    <div style={{ height: '92vh', width: '100%' }} className="flex">
      <Sidenav />
      <section className="flex items-center justify-center w-full">
        <div style={{ height: '100%', overflowY: 'scroll' }} className="flex flex-wrap justify-center items-center w-full">
          {allFavs.map(fav => (
            <div className="w-1/3 p-6 m-6 rounded shadow flex flex-wrap">
              <div className="flex w-full justify-between">
                <p>{fav.title}</p>
              </div>
              <div className="flex w-full justify-between">
                <img className=" h-48" src={fav.image} alt={fav.title} />

                <div>
                  <div
                    onClick={() => {
                      removeFav(fav.id);
                      setRemovedId(fav.id);
                    }}
                    className="flex p-2"
                  >
                    <MdDelete className="fav-remove-button" />
                    <p>Delete</p>
                  </div>

                  <div
                    onClick={() => {
                      selectedResult(fav.type, fav.id);
                      history.push('/Dashboard/Search/More');
                    }}
                    className="flex p-2"
                  >
                    <MdMore className="fav-remove-button" />
                    <p>More info</p>
                  </div>

                  <div className="flex p-2">
                    <MdNoteAdd className="fav-remove-button" />
                    <p>Add to List</p>
                  </div>
                  <div
                    onClick={() => {
                      selectedResult(fav.type, fav.id, fav.title);
                      history.push('/Dashboard/Reviews/Add');
                    }}
                    className="flex p-2"
                  >
                    <MdRateReview className="fav-remove-button" />
                    <p>Review</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

Favorites.propTypes = {
  addError: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  selectedResult: PropTypes.func.isRequired
};

export default connect(null, { addError, removeFav, selectedResult })(Favorites);
