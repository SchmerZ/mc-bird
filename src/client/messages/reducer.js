import {handleActions} from 'redux-actions'
import * as A from './actions'

const initialState = {
  fetching: false,
};

const handlers = {
  [A.fetch.request]: (state) => ({
    ...state,
    fetching: true,
  }),
  [A.fetch.success]: (state) => ({
    ...state,
    fetching: false,
  }),
  [A.fetch.failure]: (state, {payload}) => ({
    ...state,
    fetching: false,
  }),
};

export default handleActions(handlers, initialState);
