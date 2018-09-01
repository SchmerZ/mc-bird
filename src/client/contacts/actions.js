import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const init = createAction('CONTACTS_INIT');
export const leave = createAction('CONTACTS_LEAVE');
export const fetch = createRoutine('CONTACTS_FETCH');

export const prevPage = createAction('CONTACTS_PREV_PAGE');
export const nextPage = createAction('CONTACTS_NEXT_PAGE');

export const selectContact = createAction('CONTACTS_SELECT');
export const messageAdd = createAction('CONTACTS_MESSAGE_ADD');
