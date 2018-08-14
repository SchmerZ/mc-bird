import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  recipient: '',
  messageText: '',
  sending: false,
};

const handlers = {
  [A.changeRecipient]: (state, {payload: value}) => ({
    ...state,
    recipient: value,
  }),
  [A.changeMessageText]: (state, {payload: value}) => ({
    ...state,
    messageText: value,
  }),

  [A.send.request]: (state) => ({
    ...state,
    sending: true,
  }),
  [A.send.success]: (state) => ({
    ...state,
    sending: false,
  }),
  [A.send.failure]: (state, {payload}) => ({
    ...state,
    sending: false,
  }),
};

export default handleActions(handlers, initialState);