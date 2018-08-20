import createAction from "redux-actions/es/createAction";

export const navigateTo = createAction('APPLICATION_NAVIGATE_TO_PAGE');
export const notify = createAction('APPLICATION_NOTIFICATION_NOTIFY');
export const messageClose = createAction('APPLICATION_NOTIFICATION_MESSAGE_CLOSE');
