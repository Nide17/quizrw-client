import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_CHAPTERS, GET_CHAPTERS_BY_COURSE_FAIL, GET_CHAPTERS_BY_COURSE, GET_CHAPTERS_FAIL, CREATE_CHAPTER, CREATE_CHAPTER_FAIL, DELETE_CHAPTER, DELETE_CHAPTER_FAIL, UPDATE_CHAPTER, UPDATE_CHAPTER_FAIL, CHAPTERS_LOADING, CHAPTERS_BY_COURSE_LOADING } from "./chapters.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw.herokuapp.com',
});

// View all chapters
export const getChapters = () => async (dispatch, getState) => {
  await dispatch(getChaptersLoading());

  try {
    await axiosInstance
      .get('/api/chapters', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CHAPTERS,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_CHAPTERS_FAIL'));
    dispatch({ type: GET_CHAPTERS_FAIL })
  }
};


// View chapters by course
export const getChaptersByCourse = (courseId) => async (dispatch, getState) => {
  await dispatch(getChaptersByCourseLoading());

  try {
    await axiosInstance
      .get(`/api/chapters/course/${courseId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CHAPTERS_BY_COURSE,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_CHAPTERS_BY_COURSE_FAIL'));
    dispatch({ type: GET_CHAPTERS_BY_COURSE_FAIL })
  }
};

// Create chapter
export const createChapter = (newChapter) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/chapters', newChapter, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_CHAPTER,
          payload: res.data
        }),
        alert('Creating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_CHAPTER_FAIL'));
    dispatch({ type: CREATE_CHAPTER_FAIL })
  }
};

// Update a chapter
export const updateChapter = updatedChapter => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/chapters/${updatedChapter.idToUpdate}`, updatedChapter, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_CHAPTER,
          payload: updatedChapter
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_CHAPTER_FAIL'));
    dispatch({ type: UPDATE_CHAPTER_FAIL });
  }
}

// Delete a chapter
export const deleteChapter = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This chapter will be deleted permanently!")) {
      await axiosInstance.delete(`/api/chapters/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_CHAPTER,
            payload: id
          }),
          alert('Deleting ...'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CHAPTER_FAIL'));
    dispatch({ type: DELETE_CHAPTER_FAIL });
  }
}

export const getChaptersLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CHAPTERS_LOADING

  }
}

export const getChaptersByCourseLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CHAPTERS_BY_COURSE_LOADING

  }
}