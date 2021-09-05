import { GET_CONTACTS, GET_CONTACT, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL, CONTACTS_LOADING, REPLY_CONTACT, REPLY_CONTACT_FAIL, BROADCAST, BROADCAST_FAIL } from "./contacts.types";

const INITIAL_STATE = {
  contacts: [],
  broadcasts: [],
  isLoading: true
};

const contactsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_CONTACTS:
      return {
        ...state,
        isLoading: false,
        contacts: action.payload
      };

    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case BROADCAST:
      return {
        ...state,
        broadcasts: [...state.broadcasts, action.payload]
      };

    case ADD_CONTACT_FAIL:
    case DELETE_CONTACT_FAIL:
    case REPLY_CONTACT_FAIL:
    case BROADCAST_FAIL:
      return {
        ...state,
        contacts: null
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload)
      }

    case REPLY_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((cont) => {

          if (cont._id === action.payload.idToUpdate) {

            return {
              ...cont,
              reply: action.payload.reply
            }

          } else return cont;
        })
      }


    case CONTACTS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default contactsReducer;
