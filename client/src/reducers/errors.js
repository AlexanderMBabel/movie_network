import { ADD_ERROR, REMOVE_ERROR, REMOVE_ALL_ERRORS } from '../actions/types';

const initialState = {
  errors: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ERROR:
      console.log(payload, 'add_error');
      return {
        ...state,
        errors: [...state.errors, payload]
      };
    case REMOVE_ALL_ERRORS:
      return {
        ...state,
        errors: []
      };
    case REMOVE_ERROR:
      let tempErrors = state.errors;
      const index = tempErrors.indexOf(payload);
      console.log(payload);
      if (index > -1) {
        tempErrors.splice(index, 1);
      }
      return {
        ...state,
        errors: tempErrors
      };
    default:
      return state;
  }
};
