import {select, call, put, takeLatest, fork, race, take} from 'redux-saga/effects'
import {LOCATION_CHANGE, push} from 'connected-react-router'

import * as A from './actions'
import * as applicationActions from '../application/actions'
import * as messagesActions from '../messages/actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'
import {matchPath} from "react-router";

const sagaCreator = ({services: {contactsService}}) => {
  const {fetchContacts} = contactsService;

  function* saga() {
    yield takeLatest(A.init, onInit);
    yield takeLatest(A.fetch, onFetchContacts);
    yield takeLatest([A.prevPage, A.nextPage], onPageChange);
    yield takeLatest(LOCATION_CHANGE, onLocationChange);

    yield takeLatest(A.selectContact, onSelectContact);
  }

  function* onInit() {
    yield fork(watchNewMessages);
  }

  function* onLocationChange({payload}) {
    const {location: {pathname, search}} = payload;

    if (matchPath(pathname, {path: routesIds.contacts, exact: true})) {
      const searchParams = new URLSearchParams(search);
      const offset = Number(searchParams.get('offset')) || 0;

      yield put(A.fetch({offset}));
    }
  }

  function* onPageChange() {
    const {fetchingOffset} = yield select(state => state.messagesList);
    const nextLocation = `${routesIds.messages}?offset=${fetchingOffset}`;

    yield put(push(nextLocation));
  }

  function* onFetchContacts() {
    yield put(A.fetch.request());

    const {fetchingOffset, limit} = yield select(state => state.contactsList);

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
