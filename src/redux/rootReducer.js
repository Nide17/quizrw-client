import { combineReducers } from 'redux';

import subscribersReducer from './subscribers/subscribers.reducer';
import questionsReducer from './questions/questions.reducer';
import errorReducer from './error/error.reducer';
import successReducer from './success/success.reducer';
import authReducer from './auth/auth.reducer';
import categoriesReducer from './categories/categories.reducer';
import quizesReducer from './quizes/quizes.reducer';
import scoresReducer from './scores/scores.reducer';
import contactsReducer from './contacts/contacts.reducer';
import courseCategoriesReducer from './courseCategories/courseCategories.reducer';
import coursesReducer from './courses/courses.reducer';
import chaptersReducer from './chapters/chapters.reducer';
import notesReducer from './notes/notes.reducer';
import downloadsReducer from './downloads/downloads.reducer';

const rootReducer = combineReducers({ subscribersReducer, questionsReducer, errorReducer, successReducer, authReducer, categoriesReducer, quizesReducer, scoresReducer, contactsReducer, courseCategoriesReducer, coursesReducer, chaptersReducer, notesReducer, downloadsReducer});

export default rootReducer;