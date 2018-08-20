import {createAction} from 'redux-actions'
import {createRoutine} from 'redux-saga-routines'

export const init = createAction('MESSAGES_LIST_INIT');
export const fetch = createRoutine('MESSAGES_LIST_FETCH');
