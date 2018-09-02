import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const init = createAction('CONVERSATION_INIT');
export const leave = createAction('CONVERSATION_LEAVE');
export const fetch = createRoutine('CONVERSATION_FETCH');

export const changeTypedText = createAction('CONVERSATION_TYPED_TEXT_CHANGE');
export const send = createRoutine('CONVERSATION_SEND_MESSAGE');

export const typedTextError = createAction('CONVERSATION_TYPED_TEXT_ERROR');
export const backToContacts = createAction('CONVERSATION_BACK_TO_CONTACTS');

export const messageAdd = createAction('CONVERSATION_MESSAGE_ADD');
