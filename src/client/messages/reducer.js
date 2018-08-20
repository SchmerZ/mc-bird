import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  fetching: false,
  fetchingFailed: false,
  items: [],
};

const handlers = {
  [A.init]: (state) => ({
    ...state,
    messages: [],
  }),
  [A.fetch.request]: (state) => ({
    ...state,
    fetching: true,
    fetchingFailed: false,
  }),
  [A.fetch.success]: (state) => ({
    ...state,
    fetching: false,
    fetchingFailed: false,
  }),
  [A.fetch.failure]: (state, {payload}) => ({
    ...state,
    fetching: false,
    fetchingFailed: true,
  }),
};

export default handleActions(handlers, initialState);
