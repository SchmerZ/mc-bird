import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const changeRecipient = createAction('QUICK_MESSAGE_CHANGE_RECIPIENT');
export const changeMessageText = createAction('QUICK_MESSAGE_CHANGE_MESSAGE_TEXT');
export const inputErrors = createAction('QUICK_MESSAGE_INPUT_ERRORS');

export const send = createRoutine('QUICK_MESSAGE_SEND');
