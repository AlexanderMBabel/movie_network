import { REGISTER_SUCCESS, REGISTER_FAILED, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types';
import axios from 'axios';

import history from '../history';
export const loadUser = () => async dispatch => {
  let config;
  if (localStorage.token) {
    config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };
  }

  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/auth`, config);
    const fav = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/favorites`, config);
    const rev = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/reviews/user`, config)
    const users = res.data;
    const favorites = fav.data;
    const reviews = rev.data;
    dispatch({
      type: USER_LOADED,
      payload: { users, favorites, reviews }
    });
    history.push('/Dashboard');
  } catch {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = body => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/users`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser())
    history.push('/createprofile');
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED
    });
  }
};

export const login = body => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('http://localhost:4000/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser())
    history.push('/Dashboard');
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  history.push('/Login');
};
