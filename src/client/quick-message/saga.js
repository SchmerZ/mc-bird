import {select, call, put, takeLatest} from 'redux-saga/effects'

import * as A from './actions'

const sagaCreator = ({services: {messagesService}}) => {
  const {sendMessage} = messagesService;

  function* saga() {
    //yield takeLatest(A.init, onInit);
    yield takeLatest(A.send, onSendMessageSaga);
  }

  function* onInit() {

  }

  function* onSendMessageSaga() {
    const {recipient, messageText} = yield select(state => state.quickMessage);

    yield put(A.send.request());

    try {
      yield call(sendMessage, {
        recipient,
        messageText
      });
    }
    catch (error) {
      yield put(A.send.failure(error));
    }
    finally {
      yield put(A.send.fulfill());
    }
  }

  return saga;
};

export default sagaCreator;