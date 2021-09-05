import { SET_QUESTIONS, QUESTIONS_LOADING, ADD_QUESTION, UPDATE_QUESTION, UPDATE_QUESTION_FAIL, DELETE_QUESTION, ADD_QUESTION_FAIL, DELETE_QUESTION_FAIL } from "./questions.types";
import axios from 'axios';
import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";

const axiosInstance = axios.create({
    baseURL: 'https://quizrw.herokuapp.com',
});

// Dispatches an action. This is the only way to trigger a state change.
export const setQuestions = () => async (dispatch, getState) => {
    await dispatch(setQuestionsLoading());

    try {
        await axiosInstance
            .get('/api/questions', tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: SET_QUESTIONS,
                    payload: res.data
                }))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
    }
};

//instead of id it takes the whole question
export const addQuestion = question => async (dispatch, getState) => {

    try {
        await axiosInstance
            .post('/api/questions', question, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: ADD_QUESTION,
                    payload: res.data
                }))

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_QUESTION_FAIL'));
        dispatch({ type: ADD_QUESTION_FAIL })
    }
};

// Update a Question
export const updateQuestion = updatedQuestion => async (dispatch, getState) => {

    try {
        await axiosInstance
            .put(`/api/questions/${updatedQuestion.qtId}`, updatedQuestion, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: UPDATE_QUESTION,
                    payload: updatedQuestion
                }))

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_QUESTION_FAIL'));
        dispatch({ type: UPDATE_QUESTION_FAIL })
    }
}

// Delete a Question
export const deleteQuestion = id => async (dispatch, getState) => {

    try {
        if (window.confirm("This question will be deleted permanently!")) {
            await axiosInstance
                .delete(`/api/questions/${id}`, tokenConfig(getState))
                .then(res =>
                    dispatch({
                        type: DELETE_QUESTION,
                        payload: id
                    }))
        }

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_QUESTION_FAIL'));
        dispatch({ type: DELETE_QUESTION_FAIL })
    }
};

export const setQuestionsLoading = () => {
    //Return an action to the reducer
    return {
        //action 
        type: QUESTIONS_LOADING

    };
}
