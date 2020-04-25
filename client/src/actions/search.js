import { SEARCH } from '../actions/types';

export const selectedResult = (type, id, title) => dispatch => {
  dispatch({
    type: SEARCH,
    payload: { type, id, title }
  });
};
