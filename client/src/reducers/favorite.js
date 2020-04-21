import { ADD_FAV, REMOVE_FAV } from '../actions/types';

const initialState = {
  id: null,
  mediaType: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        ...payload
      };
    case REMOVE_FAV:
      return {
        ...state
      };
    default:
      return state;
  }
};
