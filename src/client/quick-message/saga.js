import {select, call, put, takeLatest} from 'redux-saga/effects'

import * as applicationActions from '../application/actions'
import * as A from './actions'

import variant from '../constants/snackbar-variant'
import phoneValidator from '../utils/msisdn-validator'

const sagaCreator = ({services: {messagesService}}) => {
    const {sendMessage} = messagesService;

    function* saga() {
      yield takeLatest(A.send, onSendMessageSaga);
      yield takeLatest([A.changeRecipient, A.changeMessageText], validateSaga)
    }

    function* validateSaga() {
      const {recipient, messageText} = yield select(state => state.quickMessage);
      const errors = {};

      errors.recipientError = phoneValidator(recipient);

      const messageTextValid = messageText && !!messageText.length;
      errors.messageTextError = messageTextValid ? null : 'Message cannot be blank.';

      yield put(A.inputErrors({errors}));
    }

    function* onSendMessageSaga() {
      yield call(validateSaga);

      const {errors, recipient, messageText} = yield select(state => state.quickMessage);
      const hasErrors = !!Object.values(errors).filter(x => x).length;
      if (hasErrors) return;

      yield put(A.send.request());

      try {
        yield call(sendMessage, {
          recipient,
          messageText
        });

        yield put(A.send.success());
        yield put(applicationActions.notify({message: 'Message has been sent.', type: variant.success}));
      }
      catch (error) {
        const {message} = error;

        yield put(A.send.failure({message}));
        yield put(applicationActions.notify({message, type: variant.error}));
      }
      finally {
        yield put(A.send.fulfill());
      }
    }

    return saga;
  }
;

export default sagaCreator;
