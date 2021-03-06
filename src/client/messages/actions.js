import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const init = createAction('MESSAGES_LIST_INIT');
export const leave = createAction('MESSAGES_LIST_LEAVE');
export const fetch = createRoutine('MESSAGES_LIST_FETCH');

export const changeStatusFilter = createAction('MESSAGES_LIST_STATUS_FILTER_CHANGE');
export const prevPage = createAction('MESSAGES_LIST_PREV_PAGE');
export const nextPage = createAction('MESSAGES_LIST_NEXT_PAGE');

export const incomeMessage = createAction('MESSAGES_LIST_INCOME_MESSAGE');
export const messageAdd = createAction('MESSAGES_LIST_MESSAGE_ADD');
