import { GET_NOTES, GET_NOTES_FAIL, GET_NOTES_BY_CHAPTER_FAIL, NOTES_BY_CHAPTER_LOADING, GET_NOTES_BY_CHAPTER, CREATE_NOTE, CREATE_NOTE_FAIL, DELETE_NOTE, DELETE_NOTE_FAIL, UPDATE_NOTE, UPDATE_NOTE_FAIL, NOTES_LOADING } from './notes.types';

const INITIAL_STATE = {
  allNotes: [],
  isLoading: true,
  notesByChapter: [],
  allDownloads: [],
  isByChapterLoading: true,
};

const notesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_NOTES:
      return {
        ...state,
        isLoading: false,
        allNotes: action.payload
      };

    case GET_NOTES_BY_CHAPTER:
      return {
        ...state,
        isByChapterLoading: false,
        notesByChapter: action.payload
      };

    case CREATE_NOTE:
      return {
        ...state,
        allNotes: [...state.allNotes, action.payload],
      };

    case CREATE_NOTE_FAIL:
    case DELETE_NOTE_FAIL:
    case UPDATE_NOTE_FAIL:
    case GET_NOTES_FAIL:
    case GET_NOTES_BY_CHAPTER_FAIL:
      return {
        ...state,
        msg: 'Failed!'
      };

    case UPDATE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.map((note) => {

          if (note._id === action.payload.idToUpdate) {

            return {
              ...note,
              title: action.payload.title,
              description: action.payload.description
            }

          } else return note;
        })
      }

    case DELETE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.filter(note => note._id !== action.payload)
      }

    case NOTES_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case NOTES_BY_CHAPTER_LOADING:
      return {
        ...state,
        isByChapterLoading: true
      }

    default:
      return state;
  }
};

export default notesReducer;