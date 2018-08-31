import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  fetching: true,
  fetchingOffset: 0,
  fetchingFailed: false,

  contacts: {},
  totalCount: 0,
  offset: 0,
  limit: 10,
};

const handlers = {
  [A.init]: (state) => ({
    ...state,
    contacts: {},
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

    const hash = items.reduce((memo, curr) => ({
      ...memo,
      [curr.msisdn]: curr
    }), {});

    return {
      ...state,
      contacts: hash,
      totalCount,
      offset,
      fetching: false,
      fetchingFailed: false,
    }
  },
  [A.fetch.failure]: (state) => ({
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
    const {msisdn} = payload;
    const current = state.contacts[msisdn];

    return {
      ...state,
      contacts: {
        ...state.contacts,
        [msisdn]: {
          ...current,
          messages: {
            ...current.messages,
            totalCount: current.messages.totalCount + 1,
          }
        }
      }
    }
  }
};

export default handleActions(handlers, initialState);
