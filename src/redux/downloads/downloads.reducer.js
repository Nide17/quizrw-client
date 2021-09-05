import { SAVE_DOWNLOAD, SAVE_DOWNLOAD_FAIL, GET_DOWNLOADS, GET_DOWNLOADS_FAIL, DELETE_DOWNLOAD, DELETE_DOWNLOAD_FAIL, DOWNLOADS_LOADING } from './downloads.types';

const INITIAL_STATE = {
  isLoading: true,
  allDownloads: [],
};

const downloadsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SAVE_DOWNLOAD:
      return {
        ...state,
        allDownloads: [...state.allDownloads, action.payload],
      };

    case GET_DOWNLOADS:
      return {
        ...state,
        isLoading: false,
        allDownloads: action.payload
      };

    case SAVE_DOWNLOAD_FAIL:
    case GET_DOWNLOADS_FAIL:
    case DELETE_DOWNLOAD_FAIL:
      return {
        ...state,
        msg: 'Failed!'
      };

    
    case DELETE_DOWNLOAD:
      return {
        ...state,
        allDownloads: state.allDownloads.filter(download => download._id !== action.payload)
      }

    case DOWNLOADS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state;
  }
};

export default downloadsReducer;