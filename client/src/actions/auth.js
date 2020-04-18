import { REGISTER_SUCCESS, REGISTER_FAILED, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:4000/auth');
    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
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
