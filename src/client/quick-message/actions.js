import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

//export const init = createAction('SEND_SMS_INIT');

export const changeRecipient = createAction('QUICK_MESSAGE_CHANGE_RECIPIENT');
export const changeMessageText = createAction('QUICK_MESSAGE_CHANGE_MESSAGE_TEXT');

export const send = createRoutine('QUICK_MESSAGE_SEND');