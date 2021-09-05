import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL, REPLY_CONTACT_FAIL, CONTACTS_LOADING, REPLY_CONTACT, BROADCAST, BROADCAST_FAIL } from "./contacts.types";
import axios from 'axios';

import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";
import { returnSuccess } from '../success/success.actions'

const axiosInstance = axios.create({
  baseURL: 'https://quizrw.herokuapp.com',
});

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.
export const getContacts = () => async (dispatch, getState) => {
  await dispatch(setContactsLoading());

  try {
    await axiosInstance
      .get('/api/contacts', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CONTACTS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status))
  }
};

export const sendBroadcast = (newMessage) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/contacts/broadcast', newMessage, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: BROADCAST,
          payload: res.data
        }))
      .then(res =>
        dispatch(returnSuccess('Broadcast sent successfully!', 200, 'CREATE_QUIZ')))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'BROADCAST_FAIL'));
    dispatch({ type: BROADCAST_FAIL })
  }
};

export const sendMsg = (contactMsg) => async (dispatch) => {

  try {
    await axiosInstance
      .post('/api/contacts', contactMsg)
      .then(res =>
        dispatch({
          type: ADD_CONTACT,
          payload: res.data
        }),
        alert('Sending ...')
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CONTACT_FAIL'));
    dispatch({ type: ADD_CONTACT_FAIL })
  }
};

// Reply a contact
export const replyContact = (idToUpdate, reply) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/contacts/${idToUpdate}`, reply, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: REPLY_CONTACT,
          payload: reply
        }),
        alert('Replying ...'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'REPLY_CONTACT_FAIL'));
    dispatch({ type: REPLY_CONTACT_FAIL });
  }
}

// Delete a Contact
export const deleteContact = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This contact will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/contacts/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_CONTACT,
            payload: id
          }),
          alert('Deleting ...'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CONTACT_FAIL'));
    dispatch({ type: DELETE_CONTACT_FAIL })
  }
}

export const setContactsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: CONTACTS_LOADING

  }
}