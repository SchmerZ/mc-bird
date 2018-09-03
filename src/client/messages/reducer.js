import {handleActions} from 'redux-actions'
import * as A from './actions'

import statusFilters from '../constants/status-filters'

const initialState = {
  fetching: true,
  fetchingParams: {
    offset: 0,
    status: statusFilters.all,
  },
  fetchingFailed: false,

  items: [],
  totalCount: 0,
  offset: 0,
  statusFilter: statusFilters.all,
  limit: 10,
};

const handlers = {
  [A.init]: (state) => ({
    ...state,
    items: [],
  }),

  [A.fetch]: (state, {payload: {offset, status}}) => ({
    ...state,
    fetchingParams: {
      offset,
      status,
    }
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
      statusFilter: state.fetchingParams.status,
      fetching: false,
      fetchingFailed: false,
    }
  },
  [A.fetch.failure]: (state) => ({
    ...state,
    fetching: false,
    fetchingFailed: true,
  }),

  [A.changeStatusFilter]: (state, {payload: value}) => ({
    ...state,
    fetchingParams: {
      offset: 0,
      status: value,
    },
  }),
  [A.nextPage]: (state) => ({
    ...state,
    fetchingParams: {
      ...state.fetchingParams,
      offset: Math.min(state.offset + state.limit, state.totalCount),
    },
  }),
  [A.prevPage]: (state) => ({
    ...state,
    fetchingParams: {
      ...state.fetchingParams,
      offset: Math.max(state.offset - state.limit, 0),
    },
  }),

  [A.messageAdd]: (state, {payload}) => {
    const {message} = payload;
    const nextOverLimit = state.items.length === state.limit;
    const nextItems = nextOverLimit
      ? [message, ...state.items.slice(0, state.items.length - 1)]
      : [message, ...state.items];

    return {
      ...state,
      items: nextItems,
      totalCount: state.totalCount + 1,
    }
  }
};

export default handleActions(handlers, initialState);
