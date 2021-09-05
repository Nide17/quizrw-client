import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { returnSuccess } from '../success/success.actions'
import { SET_QUIZES, GET_ONE_QUIZ, GET_ONE_QUIZ_FAIL, CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL, UPDATE_QUIZ, UPDATE_QUIZ_FAIL, QUIZES_LOADING, NOTIFY_USERS, NOTIFY_USERS_FAIL } from "./quizes.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw.herokuapp.com',
});

// View all quizes
export const setQuizes = (limit, skip) => async (dispatch, getState) => {
  await dispatch(setQuizesLoading());

  try {
    await axiosInstance
      .get(`/api/quizes?limit=${limit}&skip=${skip}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: SET_QUIZES,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View one quiz
export const getOneQuiz = (quizId) => async (dispatch) => {
  await dispatch(setQuizesLoading());

  try {
    await axiosInstance
      .get(`/api/quizes/${quizId}`)
      .then(res =>
        dispatch({
          type: GET_ONE_QUIZ,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_QUIZ_FAIL'));
    dispatch({ type: GET_ONE_QUIZ_FAIL })
  }
};

// Create Quiz
export const createQuiz = (newQuiz) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/quizes', newQuiz, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_QUIZ,
          payload: res.data
        }),
        alert('Creating ...'))
      .then(res =>
        dispatch(returnSuccess('Quiz created successfully!', 200, 'CREATE_QUIZ')))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_QUIZ_FAIL'));
    dispatch({ type: CREATE_QUIZ_FAIL })
  }
};

// Send Mail after quiz full
export const notifying = (newQuizInfo) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/quizes/notifying', newQuizInfo, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: NOTIFY_USERS,
          payload: res.data
        }),
        alert('Sending emails ...'))

      // Reload the page after category addition
      .then(window.location.href = "/webmaster")

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'NOTIFY_USERS_FAIL'));
    dispatch({ type: NOTIFY_USERS_FAIL })
  }
};

// Update a Quiz
export const updateQuiz = updatedQuiz => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/quizes/${updatedQuiz.quizID}`, updatedQuiz, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_QUIZ,
          payload: updatedQuiz
        }),
        alert('Updating ...'))
      // Reload the page update
      .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_QUIZ_FAIL'));
    dispatch({ type: UPDATE_QUIZ_FAIL })
  }
}

// Delete a Quiz
export const deleteQuiz = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This quiz will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/quizes/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_QUIZ,
            payload: id
          }),
          alert('Deleting ...'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_QUIZ_FAIL'));
    dispatch({ type: DELETE_QUIZ_FAIL })
  }
}

export const setQuizesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: QUIZES_LOADING

  };
}
