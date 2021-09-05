import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { returnSuccess } from '../success/success.actions'
import { GET_NOTES, GET_NOTES_FAIL, GET_NOTES_BY_CHAPTER_FAIL, NOTES_BY_CHAPTER_LOADING, GET_NOTES_BY_CHAPTER, CREATE_NOTE, CREATE_NOTE_FAIL, DELETE_NOTE, DELETE_NOTE_FAIL, UPDATE_NOTE, UPDATE_NOTE_FAIL, NOTES_LOADING } from "./notes.types";
import { tokenConfig, uploadConfig } from '../auth/auth.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw-server.herokuapp.com/',
});

// View all notes
export const getNotes = () => async (dispatch, getState) => {
  await dispatch(getNotesLoading());

  try {
    await axiosInstance
      .get('/api/notes', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_NOTES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_NOTES_FAIL'));
    dispatch({ type: GET_NOTES_FAIL })
  }
};

// View notes by chapter
export const getNotesByChapter = (chapterId) => async (dispatch, getState) => {
  await dispatch(getNotesByChapterLoading());

  try {
    await axiosInstance
      .get(`/api/notes/chapter/${chapterId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_NOTES_BY_CHAPTER,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTES_BY_CHAPTER_FAIL'));
    dispatch({ type: GET_NOTES_BY_CHAPTER_FAIL })
  }
};

// Create notes
export const createNotes = (newNotes, onUploadProgress) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/notes', newNotes, uploadConfig(getState, onUploadProgress))
      .then(res =>
        dispatch({
          type: CREATE_NOTE,
          payload: res.data
        }))
      .then(res =>
        dispatch(returnSuccess('Notes uploaded successfully!', 200, 'CREATE_NOTE')))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_NOTE_FAIL'));
    dispatch({ type: CREATE_NOTE_FAIL })
  }
};

// Update a notes
export const updateNotes = updatedNotes => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/notes/${updatedNotes.idToUpdate}`, updatedNotes, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_NOTE,
          payload: updatedNotes
        }),
        alert('Updating ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_NOTE_FAIL'));
    dispatch({ type: UPDATE_NOTE_FAIL });
  }
}

// Delete a notes
export const deleteNotes = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This notes will be deleted permanently!")) {
      await axiosInstance.delete(`/api/notes/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_NOTE,
            payload: id
          }),
          alert('Deleting ...'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NOTE_FAIL'));
    dispatch({ type: DELETE_NOTE_FAIL });
  }
}

export const getNotesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: NOTES_LOADING

  }
}

export const getNotesByChapterLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: NOTES_BY_CHAPTER_LOADING

  }
}