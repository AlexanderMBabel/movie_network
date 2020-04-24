import { ADD_ERROR, REMOVE_ERROR, REMOVE_ALL_ERRORS } from './types';

export const addError = error => dispatch => {
  console.log(error);
  dispatch({
    type: ADD_ERROR,
    payload: error
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALL_ERRORS
    });
  }, 2000);
};

export const removeError = error => dispatch => {
  dispatch({
    type: REMOVE_ERROR,
    payload: error
  });
};
