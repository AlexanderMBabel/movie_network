import { SEARCH } from '../actions/types';

const initialState = {
  id: null,
  type: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
