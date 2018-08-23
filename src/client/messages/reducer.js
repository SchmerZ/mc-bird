import {handleActions} from 'redux-actions'
import * as A from './actions'

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
    fetchingOffset: state.offset + state.limit,
  }),
  [A.prevPage]: (state) => ({
    ...state,
    fetchingOffset: state.offset - state.limit,
  }),
};

export default handleActions(handlers, initialState);
