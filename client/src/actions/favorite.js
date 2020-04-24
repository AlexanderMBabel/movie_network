import { ADD_FAV, REMOVE_FAV } from './types';
import Axios from 'axios';
import { addError } from './errors';

export const addFavorite = (id, type, image, title, plot) => dispatch => {
  const config = {
    headers: {
      'x-auth-token': localStorage.token
    }
  };
  Axios.post(`${process.env.REACT_APP_SERVER_HOST}/favorites`, { id, type, image, title, plot }, config)
    .then(res => {
      console.log('Favorite added');
      dispatch(addError({ alert: `${title} favorited`, type: 'success' }));
    })
    .catch(err => dispatch(addError({ alert: err, type: 'error' })));
  dispatch({
    type: ADD_FAV,
    payload: { id }
  });
};
