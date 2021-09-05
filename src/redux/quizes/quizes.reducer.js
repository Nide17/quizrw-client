import { SET_QUIZES, GET_ONE_QUIZ, GET_ONE_QUIZ_FAIL,CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL, UPDATE_QUIZ, UPDATE_QUIZ_FAIL, QUIZES_LOADING, NOTIFY_USERS, NOTIFY_USERS_FAIL } from "./quizes.types";

const INITIAL_STATE = {
  allQuizes: [],
  oneQuiz: '',
  isLoading: true
};

const quizesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_QUIZES:
      return {
        ...state,
        isLoading: false,
        allQuizes: action.payload
      };

    case GET_ONE_QUIZ:
      return {
        ...state,
        isLoading: false,
        oneQuiz: action.payload
      };

    case CREATE_QUIZ:
      return {
        ...state,
        allQuizes: [...state.allQuizes, action.payload]
      };

    case NOTIFY_USERS:
      return {
        ...state,
        newQuizInfo: action.payload
      };

    case CREATE_QUIZ_FAIL:
    case DELETE_QUIZ_FAIL:
    case UPDATE_QUIZ_FAIL:
    case NOTIFY_USERS_FAIL:
    case GET_ONE_QUIZ_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_QUIZ:
      return {
        ...state,
        allQuizes: state.allQuizes.map((quiz) => {

          if (quiz._id === action.payload.quizID) {

            return {
              ...quiz,
              title: action.payload.title,
              description: action.payload.description,
              last_updated_by: action.payload.last_updated_by,
              category: action.payload.category,
              oldCategoryID: action.payload.oldCategoryID
            }

          } else return quiz;
        })
      }

    case DELETE_QUIZ:
      return {
        ...state,
        allQuizes: state.allQuizes.filter(quiz => quiz._id !== action.payload)
      }

    case QUIZES_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state;
  }
};

export default quizesReducer;