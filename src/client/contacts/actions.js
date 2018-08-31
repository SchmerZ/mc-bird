import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const init = createAction('CONTACTS_INIT');
export const fetch = createRoutine('CONTACTS_FETCH');

export const prevPage = createAction('CONTACTS_PREV_PAGE');
export const nextPage = createAction('CONTACTS_NEXT_PAGE');

export const navigateToConversation = createAction('CONTACTS_NAVIGATE_TO_CONVERSATION');
export const messageAdd = createAction('CONTACTS_MESSAGE_ADD');
