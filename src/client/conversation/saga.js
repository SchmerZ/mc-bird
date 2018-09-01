import {select, call, put, takeLatest, fork, race, take} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'
import * as applicationActions from '../application/actions'
import * as messagesActions from '../messages/actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'

const sagaCreator = ({services: {contactsService, messagesService}}) => {
  const {fetchContactMessages} = contactsService;
  const {sendMessage} = messagesService;

  function* saga() {
    yield takeLatest(A.init, onInit);

    yield takeLatest(A.fetch, onFetchMessages);
    yield takeLatest(A.send, onSendMessage);

    yield takeLatest(A.changeTypedText, validate);
  }

  function* onInit() {
    yield fork(watchNewMessages);
    yield put(A.fetch());
  }

  function* onFetchMessages() {
    yield put(A.fetch.request());

    const {msisdn} = yield select(state => state.conversation);
    yield put(push(`${routesIds.contacts}/${msisdn}`));

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
    // const {contacts} = yield select(state => state.contactsList);
    // const {message: {recipient, originator}} = payload;
    //
    // if (contacts[recipient])
    //   yield put(A.messageAdd({msisdn: recipient}));
    //
    // if (contacts[originator])
    //   yield put(A.messageAdd({msisdn: originator}));
  }

  return saga;
};

export default sagaCreator;
