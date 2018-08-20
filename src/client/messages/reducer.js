import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  fetching: true,
  fetchingFailed: false,

  items: [],
  totalCount: 0,
  offset: 0,
};

const handlers = {
  [A.init]: (state) => ({
    ...state,
    messages: [],
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
};

export default handleActions(handlers, initialState);
