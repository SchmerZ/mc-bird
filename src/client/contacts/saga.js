import {select, call, put, takeLatest, fork, race, take} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'
import * as applicationActions from '../application/actions'
import * as messagesActions from '../messages/actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'

const sagaCreator = ({services: {contactsService}}) => {
  const {fetchContacts} = contactsService;

  function* saga() {
    yield takeLatest(A.init, onInit);
    yield takeLatest([A.fetch, A.prevPage, A.nextPage], onFetchContacts);

    yield takeLatest(A.selectContact, onSelectContact);
  }

  function* onInit() {
    yield fork(watchNewMessages);

    const {location: {search}} = yield select(state => state.router);
    const searchParams = new URLSearchParams(search);
    const offset = Number(searchParams.get('offset'));

    yield put(A.fetch({offset}));
  }

  function* onFetchContacts() {
    yield put(A.fetch.request());

    const {fetchingOffset, limit} = yield select(state => state.contactsList);
    yield put(push(`${routesIds.contacts}?offset=${fetchingOffset}`));

    try {
      const {items, totalCount, offset} = yield call(
        fetchContacts,
        {offset: fetchingOffset, limit}
      );

      yield put(A.fetch.success({items, totalCount, offset}));
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

  function* onSelectContact({payload: {msisdn}}) {
    yield put(push(`${routesIds.contacts}/${msisdn}`));
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
    const {contacts} = yield select(state => state.contactsList);
    const {message: {recipient, originator}} = payload;

    if (contacts[recipient])
      yield put(A.messageAdd({msisdn: recipient}));

    if (contacts[originator])
      yield put(A.messageAdd({msisdn: originator}));
  }

  return saga;
};

export default sagaCreator;
