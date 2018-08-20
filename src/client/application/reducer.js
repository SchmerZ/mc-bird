import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  messages: [],
};

const handlers = {
  [A.notify]: (state, {payload: {message, type}}) => {
    const nextMessages = [...state.messages, {message, type}];

    return {
      ...state,
      messages: nextMessages,
    }
  },
  [A.messageClose]: (state) => {
    const [, ...restMessages] = state.messages;

    return {
      ...state,
      messages: restMessages,
    }
  },
};

export default handleActions(handlers, initialState);
