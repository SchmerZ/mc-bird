import {handleActions} from 'redux-actions'
import {createSelector} from 'reselect'

import moment from 'moment'

import * as A from './actions'

const initialState = {
  fetching: true,
  fetchingFailed: false,
  sending: false,

  contact: null,
  msisdn: null,
  messages: [],
  typedText: '',
  error: null,
};

const handlers = {
  [A.init]: (state, {payload}) => ({
    ...state,
    msisdn: payload.match.params.msisdn,
    contact: null,
    messages: [],
    error: null,
  }),

  [A.fetch.request]: (state) => ({
    ...state,
    fetching: true,
  }),
  [A.fetch.success]: (state, {payload}) => {
    const {items, contact} = payload;

    return {
      ...state,
      contact,
      messages: items,
      fetching: false,
      fetchingFailed: false,
    }
  },
  [A.fetch.failure]: (state) => ({
    ...state,
    fetching: false,
    fetchingFailed: true,
  }),

  [A.changeTypedText]: (state, {payload: value}) => ({
    ...state,
    typedText: value,
  }),

  [A.typedTextError]: (state, {payload: {error}}) => ({
    ...state,
    error,
  }),

  [A.send.request]: (state) => ({
    ...state,
    sending: true,
  }),
  [A.send.success]: (state, {payload: sentMessage}) => {
    return {
      ...state,
      messages: [sentMessage, ...state.messages],
      typedText: '',
      sending: false,
    }
  },
  [A.send.failure]: (state) => ({
    ...state,
    sending: false,
  }),

  // [A.messageAdd]: (state, {payload}) => {
  //   const {msisdn} = payload;
  //   const current = state.contacts[msisdn];
  //
  //   return {
  //     ...state,
  //     contacts: {
  //       ...state.contacts,
  //       [msisdn]: {
  //         ...current,
  //         messages: {
  //           ...current.messages,
  //           totalCount: current.messages.totalCount + 1,
  //         }
  //       }
  //     }
  //   }
  // }
};

const compare = (a, b) => {
  const ma = moment(a.createdDatetime);
  const mb = moment(b.createdDatetime);

  return ma.diff(mb);
};

const itemsInReverseOrderSelector = createSelector(
  state => state.conversation.messages,
  messages => messages.sort(compare),
);

export const SELECTORS = {
  getItemsInReverseOrder: itemsInReverseOrderSelector,
};

export default handleActions(handlers, initialState);
