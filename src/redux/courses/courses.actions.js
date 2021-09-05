import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_COURSES, GET_ONE_COURSE, ONE_COURSE_LOADING, GET_ONE_COURSE_FAIL, GET_COURSES_FAIL, CREATE_COURSE, CREATE_COURSE_FAIL, DELETE_COURSE, DELETE_COURSE_FAIL, UPDATE_COURSE, UPDATE_COURSE_FAIL, GET_COURSES_BY_CATEGORY, GET_COURSES_BY_CATEGORY_FAIL, COURSES_BYCAT_LOADING, COURSES_LOADING } from "./courses.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw-server.herokuapp.com/',
});

// View all courses
export const getCourses = () => async (dispatch, getState) => {
  await dispatch(getCoursesLoading());

  try {
    await axiosInstance
      .get('/api/courses', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_COURSES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_COURSES_FAIL'));
    dispatch({ type: GET_COURSES_FAIL })
  }
};

// View one course
export const getOneCourse = (courseId) => async (dispatch, getState) => {
  await dispatch(getCoursesLoading());

  try {
    await axiosInstance
      .get(`/api/courses/${courseId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_ONE_COURSE,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_COURSE_FAIL'));
    dispatch({ type: GET_ONE_COURSE_FAIL })
  }
};

// View all courses by course category
export const getCoursesByCategory = (cCId) => async (dispatch, getState) => {
  await dispatch(getCoursesByCatLoading());

  try {
    await axiosInstance
      .get(`/api/courses/courseCategory/${cCId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_COURSES_BY_CATEGORY,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_COURSES_BY_CATEGORY_FAIL'));
    dispatch({ type: GET_COURSES_BY_CATEGORY_FAIL })
  }
};

// Create course
export const createCourse = (newCourses) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/courses', newCourses, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_COURSE,
          payload: res.data
        }),
        alert('Creating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_COURSE_FAIL'));
    dispatch({ type: CREATE_COURSE_FAIL })
  }
};

// Update a course
export const updateCourse = updatedCourse => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/courses/${updatedCourse.idToUpdate}`, updatedCourse, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_COURSE,
          payload: updatedCourse
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_COURSE_FAIL'));
    dispatch({ type: UPDATE_COURSE_FAIL });
  }
}

// Delete a course
export const deleteCourse = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This course will be deleted permanently!")) {
      await axiosInstance.delete(`/api/courses/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_COURSE,
            payload: id
          }),
          alert('Deleting ...'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_COURSE_FAIL'));
    dispatch({ type: DELETE_COURSE_FAIL });
  }
}

export const getCoursesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: COURSES_LOADING

  }
}

export const getOneCourseLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: ONE_COURSE_LOADING

  }
}

export const getCoursesByCatLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: COURSES_BYCAT_LOADING

  }
}