import { SEARCH } from '../actions/types';

export const selectedResult = (type, id) => dispatch => {
  dispatch({
    type: SEARCH,
    payload: { type, id }
  });
};
