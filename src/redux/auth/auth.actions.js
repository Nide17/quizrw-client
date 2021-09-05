import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, GET_USERS, UPDATE_USER, DELETE_USER, UPDATE_USER_FAIL, DELETE_USER_FAIL, USERS_LOADING, RESET_PASSWORD, FORGOT_PASSWORD, UNEXISTING_EMAIL } from "./auth.types";

const axiosInstance = axios.create({
  baseURL: 'https://quizrw-server.herokuapp.com/',
});

//HELPER FUNCTION TO GET THE TOKEN - SETUP CONFIG/headers and token
export const tokenConfig = getState => {

  // Get token from localStorage
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // If token, add to header
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config
}

export const uploadConfig = (getState, onUploadProgress) => {

  // Get token from localStorage
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }, onUploadProgress
  };

  // If token, add to header
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config
}

// Check token & load user
export const loadUser = () => (dispatch, getState) => {

  // User loading
  dispatch({ type: USER_LOADING });

  axiosInstance
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))

    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    });
}


// View all users
export const getUsers = (pageNo) => async (dispatch, getState) => {
  await dispatch(setUsersLoading());

  try {
    await axiosInstance
      .get(`/api/users?pageNo=${pageNo}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_USERS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status))
  }
};


// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password });

  axiosInstance.post('/api/auth/register', body, config)

    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))

    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
}

// Login User
export const login = ({ email, password }) =>
  dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axiosInstance
      .post('/api/auth/login', body, config)
      .then(res =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };

// Logout USER
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  })
}

// Update a USER
export const updateUser = updatedUser => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/users/${updatedUser.uId}`, updatedUser, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_USER,
          payload: updatedUser
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_USER_FAIL'));
    dispatch({ type: UPDATE_USER_FAIL })
  }
}

// Forgot password
export const sendResetLink = fEmail => async (dispatch) => {

  try {

    await axiosInstance
      .post('/api/auth/forgot-password', fEmail)
      .then(() =>
        dispatch({
          type: FORGOT_PASSWORD,
          payload: fEmail
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UNEXISTING_EMAIL'));
    dispatch({ type: UNEXISTING_EMAIL })
  }
}


// Forgot password
export const sendNewPassword = updatePsw => async (dispatch) => {

  try {

    await axiosInstance
      .post('/api/auth/reset-password', updatePsw)
      .then(() =>
        dispatch({
          type: RESET_PASSWORD,
          payload: updatePsw
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


// Delete a USER
export const deleteUser = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This user will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/users/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_USER,
            payload: id
          }),
          alert('Deleting ...'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_USER_FAIL'));
    dispatch({ type: DELETE_USER_FAIL })
  }
}

export const setUsersLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: USERS_LOADING

  };
}
