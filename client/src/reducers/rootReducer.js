import { combineReducers } from 'redux';

import auth from './auth';
import search from './search';
import favorite from './favorite';
import errors from './errors';

export default combineReducers({
  auth,
  search,
  favorite,
  errors
});
