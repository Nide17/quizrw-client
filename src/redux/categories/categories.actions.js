import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_CATEGORIES, GET_ONE_CATEGORY, GET_ONE_CATEGORY_FAIL, SET_CATEGORIES_FAIL, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL, UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL, CATEGORIES_LOADING } from "./categories.types";
import { tokenConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw.herokuapp.com',
});

// View all categories
export const setCategories = () => async (dispatch, getState) => {
  await dispatch(setCategoriesLoading());

  try {
    await axiosInstance
      .get('/api/categories', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: SET_CATEGORIES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'SET_CATEGORIES_FAIL'));
    dispatch({ type: SET_CATEGORIES_FAIL })
  }
};

// View one category
export const getOneCategory = (categoryId) => async (dispatch, getState) => {
  await dispatch(setCategoriesLoading());

  try {
    await axiosInstance
      .get(`/api/categories/${categoryId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_ONE_CATEGORY,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_CATEGORY_FAIL'));
    dispatch({ type: GET_ONE_CATEGORY_FAIL })
  }
};

// Create category
export const createCategory = (newCategory) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/categories', newCategory, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_CATEGORY,
          payload: res.data
        }),
        alert('Creating ...'))

      // Reload the page after category addition
      .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_CATEGORY_FAIL'));
    dispatch({ type: CREATE_CATEGORY_FAIL })
  }
};


// Update a category
export const updateCategory = updatedCatg => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/categories/${updatedCatg.idToUpdate}`, updatedCatg, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_CATEGORY,
          payload: updatedCatg
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_CATEGORY_FAIL'));
    dispatch({ type: UPDATE_CATEGORY_FAIL });
  }
}


// Delete a category
export const deleteCategory = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This category will be deleted permanently!")) {
      await axiosInstance.delete(`/api/categories/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_CATEGORY,
            payload: id
          }),
          alert('Deleting ...'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CATEGORY_FAIL'));
    dispatch({ type: DELETE_CATEGORY_FAIL });
  }
}

export const setCategoriesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CATEGORIES_LOADING

  }
}