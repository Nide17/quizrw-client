import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_COURSE_CATEGORIES, GET_COURSE_CATEGORIES_FAIL, CREATE_COURSE_CATEGORY, CREATE_COURSE_CATEGORY_FAIL, DELETE_COURSE_CATEGORY, DELETE_COURSE_CATEGORY_FAIL, UPDATE_COURSE_CATEGORY, UPDATE_COURSE_CATEGORY_FAIL, COURSE_CATEGORIES_LOADING } from "./courseCategories.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw-server.herokuapp.com/',
});

// View all course categories
export const getCourseCategories = () => async (dispatch, getState) => {
  await dispatch(getCourseCategoriesLoading());

  try {
    await axiosInstance
      .get('/api/courseCategories', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_COURSE_CATEGORIES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_COURSE_CATEGORIES_FAIL'));
    dispatch({ type: GET_COURSE_CATEGORIES_FAIL })
  }
};

// Create course category
export const createCourseCategory = (newCourseCategory) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/courseCategories', newCourseCategory, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_COURSE_CATEGORY,
          payload: res.data
        }),
        alert('Creating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_COURSE_CATEGORY_FAIL'));
    dispatch({ type: CREATE_COURSE_CATEGORY_FAIL })
  }
};


// Update a course category
export const updateCourseCategory = updatedCourseCatg => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/courseCategories/${updatedCourseCatg.idToUpdate}`, updatedCourseCatg, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_COURSE_CATEGORY,
          payload: updatedCourseCatg
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_COURSE_CATEGORY_FAIL'));
    dispatch({ type: UPDATE_COURSE_CATEGORY_FAIL });
  }
}


// Delete a course category
export const deleteCourseCategory = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This course category will be deleted permanently!")) {
      await axiosInstance.delete(`/api/courseCategories/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_COURSE_CATEGORY,
            payload: id
          }),
          alert('Deleting ...'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_COURSE_CATEGORY_FAIL'));
    dispatch({ type: DELETE_COURSE_CATEGORY_FAIL });
  }
}

export const getCourseCategoriesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: COURSE_CATEGORIES_LOADING

  }
}