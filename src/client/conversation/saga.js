import {select, call, put, takeLatest, fork, race, take} from 'redux-saga/effects'
import {goBack} from 'connected-react-router'

import * as A from './actions'
import * as applicationActions from '../application/actions'
import * as messagesActions from '../messages/actions'

import variant from '../constants/snackbar-variant'

const sagaCreator = ({services: {contactsService, messagesService}}) => {
  const {fetchContactMessages} = contactsService;
  const {sendMessage} = messagesService;

  function* saga() {
    yield takeLatest(A.init, onInit);

    yield takeLatest(A.fetch, onFetchMessages);
    yield takeLatest(A.send, onSendMessage);

    yield takeLatest(A.changeTypedText, validate);
    yield takeLatest(A.backToContacts, onBackToContacts);
  }

  function* onInit() {
    yield fork(watchNewMessages);
    yield put(A.fetch());
  }

  function* onBackToContacts() {
    yield put(goBack());
  }

  function* onFetchMessages() {
    yield put(A.fetch.request());

    const {msisdn} = yield select(state => state.conversation);

    try {
      const response = yield call(fetchContactMessages, {msisdn});

      yield put(A.fetch.success(response));
    }
    catch (error) {
      const {message} = error;

      yield put(A.fetch.failure({message}));
      yield put(applicationActions.notify({message, type: variant.error}));
    }
    finally {
      yield put(A.fetch.fulfill());
    }
  }

  function* onSendMessage() {
    yield call(validate);

    const {error, typedText, contact: {msisdn}} = yield select(state => state.conversation);
    if (!!error) return;

    yield put(A.send.request());

    try {
      const sentMessage = yield call(sendMessage, {
        recipient: msisdn,
        messageText: typedText,
      });

      yield put(A.send.success(sentMessage));
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

  function* validate() {
    const {typedText} = yield select(state => state.conversation);

    const messageTextValid = typedText && !!typedText.length;
    const error = messageTextValid ? null : 'Message cannot be blank.';

    yield put(A.typedTextError({error}));
  }

  function* watchNewMessages() {
    while (true) {
      const [task, cancel] = yield race([
        take(messagesActions.incomeMessage),
        take(A.leave)
      ]);

      if (cancel) return;

      if (task) {
        yield call(onIncomeMessage, task);
      }
    }
  }

  function* onIncomeMessage({payload}) {
    const {msisdn} = yield select(state => state.conversation);
    const {message} = payload;
    const {recipient, originator} = message;

    if ([recipient.toString(), originator.toString()].includes(msisdn)) {
      yield put(A.messageAdd({message}));
    }
  }

  return saga;
};

export default sagaCreator;
