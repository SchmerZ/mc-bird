import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  message: null,
  messages: [],
};

const handlers = {
  [A.notify]: (state, {payload: {message}}) => ({
    ...state,
    message,
  }),
};

export default handleActions(handlers, initialState);
