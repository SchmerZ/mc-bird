import {select, call, put, takeLatest, all} from 'redux-saga/effects'

import * as A from './actions'

import phoneValidator from '../utils/msisdn-validator'

const sagaCreator = ({services: {messagesService}}) => {
  const {sendMessage} = messagesService;

  function* saga() {
    //yield takeLatest(A.init, onInit);
    yield takeLatest(A.send, onSendMessageSaga);
    yield takeLatest(A.changeRecipient, onRecipientChangeSaga);
    yield takeLatest(A.changeMessageText, onMessageTextChangeSaga);
  }

  function* onInit() {

  }

  function* onRecipientChangeSaga() {
    const {recipient} = yield select(state => state.quickMessage);
    yield call(validateRecipient, recipient);
  }

  function* validateRecipient(recipient) {
    const {valid, error} = phoneValidator(recipient);

    const payload = {recipientError: valid ? null : error};
    yield put(A.inputError(payload));
  }

  function* onMessageTextChangeSaga() {
    const {messageText} = yield select(state => state.quickMessage);
    yield call(validateMessageText, messageText);
  }

  function* validateMessageText(messageText) {
    const valid = messageText && !!messageText.length;

    const payload = {messageTextError: valid ? null : 'Message cannot be blank.'};
    yield put(A.inputError(payload));
  }

  function* onSendMessageSaga() {
    const {recipient, messageText} = yield select(state => state.quickMessage);

    yield all([call(validateRecipient, recipient), call(validateMessageText, messageText)]);

    const {errors} = yield select(state => state.quickMessage);
    const hasErrors = !!Object.values(errors).filter(x => x).length;
    if (hasErrors) return;

    yield put(A.send.request());

    try {
      yield call(sendMessage, {
        recipient,
        messageText
      });
    }
    catch (error) {
      console.log(error)
      yield put(A.send.failure(error));
    }
    finally {
      yield put(A.send.fulfill());
    }
  }

  return saga;
};

export default sagaCreator;
