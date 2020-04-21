import { ADD_FAV, REMOVE_FAV } from './types';

export const addFavorite = (id, type) => dispatch => {
  dispatch({
    type: ADD_FAV,
    payload: { id }
  });
};
