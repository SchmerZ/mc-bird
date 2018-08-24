import {handleActions} from 'redux-actions'
import * as A from './actions'

import messageType from '../constants/message-type'

const initialState = {
  fetching: true,
  fetchingOffset: 0,
  fetchingFailed: false,

  items: [],
  totalCount: 0,
  offset: 0,
  limit: 10,
};

const handlers = {
  [A.init]: (state) => ({
    ...state,
    items: [],
  }),

  [A.fetch]: (state, {payload}) => ({
    ...state,
    fetchingOffset: payload.offset,
  }),
  [A.fetch.request]: (state) => ({
    ...state,
    fetching: true,
  }),
  [A.fetch.success]: (state, {payload}) => {
    const {items, totalCount, offset} = payload;

    return {
      ...state,
      items,
      totalCount,
      offset,
      fetching: false,
      fetchingFailed: false,
    }
  },
  [A.fetch.failure]: (state, {payload}) => ({
    ...state,
    fetching: false,
    fetchingFailed: true,
  }),

  [A.nextPage]: (state) => ({
    ...state,
    fetchingOffset: Math.min(state.offset + state.limit, state.totalCount),
  }),
  [A.prevPage]: (state) => ({
    ...state,
    fetchingOffset: Math.max(state.offset - state.limit, 0),
  }),

  [A.messageAdd]: (state, {payload}) => {
    const {message} = payload;
    const newMessage = {
      ...message,
      direction: messageType.received,
      recipients: {
        items: [{
          originator: null,
          recipient: message.recipient,
          status: "income"
        }]
      }
    };

    return {
      ...state,
      items: [newMessage, ...state.items.slice(0, state.items.length - 1)],
      totalCount: state.totalCount + 1,
    }
  }
};

export default handleActions(handlers, initialState);
